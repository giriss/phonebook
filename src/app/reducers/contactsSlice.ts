import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import Contact from '../models/contact';
import { RootState } from '../store';
import { selectCriteria, selectFilter } from './searchSlice';

export type ContactsState = {
  items: Array<Contact>;
};

const initialState: ContactsState = {
  items: [],
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    add: {
      prepare(newContact: Contact) {
        return {
          payload: { ...newContact, id: nanoid() }
        };
      },
      reducer({ items: contacts }, { payload: newContact }: PayloadAction<Contact>) {
        contacts.push(newContact);
      },
    },
    copy: {
      prepare(id: Contact['id']) {
        return {
          payload: { id , newId: nanoid() }
        };
      },
      reducer({ items: contacts }, { payload: { id, newId } }: PayloadAction<{ [k: string]: Contact['id'] }>) {
        const originalContact = contacts.find(contact => id === contact.id);
        if (originalContact) {
          contacts.push({
            ...originalContact,
            id: newId,
          });
        }
      },
    },
    edit({ items: contacts }, { payload: updatedContact }: PayloadAction<Contact>) {
      const contactIndex = contacts.findIndex(contact => contact.id === updatedContact.id);
      contacts[contactIndex] = updatedContact;
    },
    remove(state, { payload: removeId }: PayloadAction<string>) {
      const { items: contacts } = state;
      state.items = contacts.filter(({ id }) => id !== removeId);
    },
  },
});

export const { add, edit, remove, copy } = contactsSlice.actions;

export const selectContacts = (state: RootState) => state.contacts.items;
export const selectContact = (state: RootState, id: Contact['id']) =>
  state.contacts.items.find(contact => contact.id === id);

type ContactByIdMap = { [k: string]: Contact };

const filterByFullName = (state: RootState) =>
  selectContacts(state).filter(contact =>
    `${contact.firstName} ${contact.lastName}`.toLowerCase().includes(selectCriteria(state)));

const filterByFirstName = (state: RootState) =>
  selectContacts(state).filter(contact =>
    contact.firstName.toLowerCase().includes(selectCriteria(state)));

const filterByLastName = (state: RootState) =>
  selectContacts(state).filter(contact =>
    contact.lastName.toLowerCase().includes(selectCriteria(state)));

const filterByDob = (state: RootState) =>
  selectContacts(state).filter(contact =>
    contact.dob.toLowerCase().includes(selectCriteria(state)));

const filterByPhoneNumbers = (state: RootState) =>
  selectContacts(state).filter(contact =>
    contact.phoneNumbers.filter(phoneNumber =>
      phoneNumber.value.toLowerCase().includes(selectCriteria(state))).length > 0);

const filterByEmails = (state: RootState) =>
  selectContacts(state).filter(contact =>
    contact.emails.filter(email =>
      email.value.toLowerCase().includes(selectCriteria(state))).length > 0);

const filterByAddresses = (state: RootState) =>
  selectContacts(state).filter(contact =>
    contact.addresses.filter(address =>
      address.value.toLowerCase().includes(selectCriteria(state))).length > 0);

export const selectFilteredContacts = (state: RootState) => {
  if (!selectCriteria(state)) {
    return selectContacts(state);
  }

  const filter = selectFilter(state);

  switch (filter) {
    case 'firstName': return filterByFirstName(state);
    case 'lastName': return filterByLastName(state);
    case 'dob': return filterByDob(state);
    case 'phoneNumbers': return filterByPhoneNumbers(state);
    case 'emails': return filterByEmails(state);
    case 'addresses': return filterByAddresses(state);
  }

  const filteredByAny = [
    ...filterByFullName(state),
    ...filterByDob(state),
    ...filterByPhoneNumbers(state),
    ...filterByEmails(state),
    ...filterByAddresses(state),
  ].reduce(
    (prev, curr) => {
      prev[curr.id] = curr;
      return prev;
    },
    {} as ContactByIdMap,
  );

  return Object.values(filteredByAny);
};

export default contactsSlice.reducer;

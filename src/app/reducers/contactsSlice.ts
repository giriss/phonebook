import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import Contact from '../models/contact';
import { RootState } from '../store';

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
      reducer({ items: contacts }, { payload: newContact }: PayloadAction<Contact>) {
        contacts.push(newContact);
      },
      prepare(newContact: Contact) {
        return {
          payload: { ...newContact, id: nanoid() }
        };
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

export const { add, edit, remove } = contactsSlice.actions;

export const selectContacts = (state: RootState) => state.contacts.items;

export default contactsSlice.reducer;

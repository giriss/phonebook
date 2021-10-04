import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import Contact from '../../app/models/contact';
import { add, selectContacts } from '../../app/reducers/contactsSlice';
import { AppDispatch, RootState } from '../../app/store';

type Props = {
  contacts: Array<Contact>;
  onAdd: (newContact: Contact) => void;
}

function ContactsList({ contacts, onAdd }: Props) {
  return (
    <Button>
      Add
    </Button>
  );
}

export default connect(
  (state: RootState) => ({
    contacts: selectContacts(state),
  }),
  (dispatch: AppDispatch) => ({
    onAdd(newContact: Contact) {
      dispatch(
        add({
          fullName: 'Girish Gopaul',
          emails: [],
          phoneNumbers: [],
        })
      );
    },
  }),
)(ContactsList);

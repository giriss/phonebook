import React from 'react';
import { connect } from 'react-redux';
import { Card, Message } from 'semantic-ui-react';
import Contact from '../../app/models/contact';
import { selectFilteredContacts } from '../../app/reducers/contactsSlice';
import { RootState } from '../../app/store';
import ContactCard from './ContactCard';

type Props = {
  contacts: Array<Contact>;
};

function ContactsList({ contacts }: Props) {
  if (contacts.length === 0) {
    return (
      <Message
        warning
        icon="warning sign"
        header="No contacts found!"
        content="Try creating new ones or reseting the filters."
      />
    );
  }

  return (
    <Card.Group stackable itemsPerRow={3}>
      {contacts.map(contact => (
        <ContactCard contact={contact} key={contact.id} />
      ))}
    </Card.Group>
  );
}

export default connect(
  (state: RootState) => ({
    contacts: selectFilteredContacts(state),
  }),
)(ContactsList);

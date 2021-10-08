import React, { Fragment, useCallback } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { Button, Card, Icon } from 'semantic-ui-react';
import Contact from '../../app/models/contact';
import { remove } from '../../app/reducers/contactsSlice';
import { contact } from '../../app/routeResolver';
import { AppDispatch } from '../../app/store';

type Props = {
  contact: Contact;
  onDelete: VoidFunction;
};

function ContactCard({
  contact: { id, firstName, lastName, dob, phoneNumbers, emails, addresses },
  onDelete,
}: Props) {
  const history = useHistory();

  const openEditModal = useCallback(() => {
    history.push(contact.update(id));
  }, [history, id]);

  return (
    <Card link raised data-testid="contact-card">
      <Card.Content onClick={openEditModal}>
        <Card.Header>{firstName} {lastName}</Card.Header>
        <Card.Meta>Born on {dob}</Card.Meta>
        <Card.Description>
          {phoneNumbers.map(phoneNumber => (
            <Fragment key={phoneNumber.id}>
              <Icon name="phone" />{phoneNumber.value} ({phoneNumber.type})<br />
            </Fragment>
          ))}
          {emails.map(email => (
            <Fragment key={email.id}>
              <Icon name="mail" />{email.value} ({email.type})<br />
            </Fragment>
          ))}
          {addresses.map(address => (
            <Fragment key={address.id}>
              <Icon name="address book" />{address.value} ({address.type})<br />
            </Fragment>
          ))}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button basic color='green' onClick={openEditModal}>
            <Icon name="edit" /> Edit
          </Button>
          <Button basic color='red' onClick={onDelete}>
            <Icon name="delete" /> Delete
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
}

type ConnectedProps = {
  contact: Contact;
};

export default connect(
  null,
  (dispatch: AppDispatch, { contact: { id } }: ConnectedProps) => ({
    onDelete() {
      dispatch(remove(id));
    },
  }),
)(ContactCard);

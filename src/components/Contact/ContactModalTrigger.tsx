import React, { useCallback, useRef, useEffect, useMemo } from 'react';
import { Formik, FormikProps } from 'formik';
import { Button, Icon, Modal } from 'semantic-ui-react';
import { useHistory } from 'react-router';
import { connect } from 'react-redux';
import ContactForm from './ContactForm';
import Contact, { Address, Email, PhoneNumber } from '../../app/models/contact';
import { AppDispatch, RootState } from '../../app/store';
import { add as addContact, edit as editContact, selectContact } from '../../app/reducers/contactsSlice';
import contactValidation from '../../app/validations/contactValidation';
import { contact, root } from '../../app/routeResolver';

const EMPTY_CONTACT: Contact = Object.freeze({
  id: '',
  fullName: '',
  phoneNumbers: new Array<PhoneNumber>(),
  emails: new Array<Email>(),
  addresses: new Array<Address>(),
  dob: '',
});

type Props = {
  isOpen?: boolean;
  selectedContact?: Contact;
  onContactAdd: (contact: Contact) => void;
  onContactUpdate: (contact: Contact) => void;
};

function ContactModalTrigger({
  isOpen = false,
  selectedContact,
  onContactAdd,
  onContactUpdate,
}: Props) {
  const formRef = useRef<HTMLElement>(null);
  const formikRef = useRef<FormikProps<Contact>>(null);
  const history = useHistory();

  const initialValues = useMemo(
    () => selectedContact ? {...selectedContact} : {...EMPTY_CONTACT},
    [selectedContact],
  );

  const openModal = useCallback(() => history.push(contact.create()), [history]);
  const closeModal = useCallback(() => history.goBack(), [history]);

  const createContact = useCallback(() => {
    formRef.current?.dispatchEvent(new Event('submit', {
      cancelable: true,
      bubbles: true,
    }));
  }, []);

  const formSubmitted = useCallback((contact: Contact) => {
    if (!contact.id) {
      onContactAdd(contact);
    } else {
      onContactUpdate(contact);
    }
    history.push(root.home());
  }, [onContactAdd, onContactUpdate, history]);

  useEffect(() => {
    if (isOpen) {
      formikRef.current?.resetForm();
    }
  }, [isOpen, selectedContact]);

  return (
    <Formik
      enableReinitialize
      validationSchema={contactValidation}
      innerRef={formikRef}
      initialValues={initialValues}
      onSubmit={formSubmitted}
    >
      {props => (
        <Modal
          closeIcon
          onOpen={openModal}
          onClose={closeModal}
          open={isOpen}
          trigger={
            <Button primary fluid animated='fade'>
              <Button.Content visible>Create Contact</Button.Content>
              <Button.Content hidden><Icon name='add' /></Button.Content>
            </Button>
          }
        >
          <Modal.Header>{selectedContact ? 'Edit' : 'Add'} contact</Modal.Header>
          <Modal.Content>
            <ContactForm ref={formRef} onSubmit={props.handleSubmit} {...props} />
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={closeModal}>Cancel</Button>
            <Button primary onClick={createContact} disabled={!props.dirty || !props.isValid}>
              {selectedContact ? 'Update' : 'Create'}
            </Button>
          </Modal.Actions>
        </Modal>
      )}
    </Formik>
  );
}

type ConnectedProps = {
  contactId?: Contact['id'];
};

export default connect(
  (state: RootState, { contactId }: ConnectedProps) => ({
    selectedContact: contactId ? selectContact(state, contactId) : undefined,
  }),
  (dispatch: AppDispatch) => ({
    onContactAdd(contact: Contact) {
      dispatch(addContact(contact));
    },
    onContactUpdate(contact: Contact) {
      dispatch(editContact(contact));
    },
  }),
)(ContactModalTrigger);

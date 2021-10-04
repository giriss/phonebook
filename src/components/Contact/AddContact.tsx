import React, { useState, useCallback } from 'react';
import { Button, Icon, Modal } from 'semantic-ui-react';

function AddContact() {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  return (
    <Modal
      onOpen={openModal}
      onClose={closeModal}
      open={isOpen}
      trigger={
        <Button fluid animated='fade'>
          <Button.Content visible>Create Contact</Button.Content>
          <Button.Content hidden><Icon name='add' /></Button.Content>
        </Button>
      }
    >
      <Modal.Header>Add contact</Modal.Header>
      <Modal.Content>
        form here
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={closeModal}>Cancel</Button>
      </Modal.Actions>
    </Modal>
  );
}

export default AddContact;

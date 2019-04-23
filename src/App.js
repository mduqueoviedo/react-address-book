import React, { Component } from 'react';
import ReactModal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { rootStyle, newContactElementStyle } from './appStyle';
import { Contact } from './components/contact/Contact';
import { NewContactModal } from './components/newContactModal/NewContactModal';
import { StorageApi } from './storage/storageApi';
import { validateContact } from './utils/contactValidation';

// Screen readers
ReactModal.setAppElement('#root');
export class App extends Component {
  storageApi = new StorageApi();

  state = {
    isModalOpen: false,
    contactToEdit: undefined,
    contacts: [],
    contactFormErrors: [],
  };

  componentDidMount() {
    this.refreshContacts();
  }

  refreshContacts = () => {
    this.storageApi.retrieveAllContacts().then(contacts => {
      this.setState({ contacts, isModalOpen: false });
    });
  };

  editContact = contactId => {
    this.setState(prevState => ({
      contactToEdit: prevState.contacts.find(
        contact => contactId === contact.id
      ),
      isModalOpen: true,
    }));
  };

  removeContact = contactId => {
    this.storageApi.deleteContact(contactId);
    this.refreshContacts();
  };

  setIsModalOpen = newModalState => () => this.modalStateHandler(newModalState);

  modalStateHandler = modalState => {
    this.setState(prevState => {
      return {
        isModalOpen: modalState,
        contactToEdit: modalState ? prevState.contactToEdit : undefined,
        contactFormErrors: [],
      };
    });
  };

  onContactSave = newContact => {
    const formValidationErrors = validateContact(newContact);

    if (formValidationErrors.length === 0) {
      this.storageApi.saveContact(newContact);
      this.refreshContacts();
    } else {
      this.setState({ contactFormErrors: formValidationErrors });
    }
  };

  renderContacts = () =>
    this.state.contacts.length > 0
      ? this.state.contacts.map(contact => (
          <Contact
            contactData={contact}
            key={contact.id}
            onEdit={this.editContact}
            onDelete={this.removeContact}
          />
        ))
      : null;

  renderModal = () =>
    this.state.isModalOpen ? (
      <NewContactModal
        isOpen={this.state.isModalOpen}
        handleClose={this.setIsModalOpen(false)}
        onContactSave={this.onContactSave}
        contactToEdit={this.state.contactToEdit}
        formErrors={this.state.contactFormErrors}
      />
    ) : null;

  render() {
    return (
      <div className={rootStyle}>
        <h2>React Address Book</h2>
        <div>{this.renderContacts()}</div>
        <div
          className={newContactElementStyle}
          onClick={this.setIsModalOpen(true)}
          title="New Contact"
        >
          <FontAwesomeIcon icon="user-plus" />
        </div>

        {this.renderModal()}
      </div>
    );
  }
}

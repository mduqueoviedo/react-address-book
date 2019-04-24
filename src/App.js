import React, { Component } from 'react';
import ReactModal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  appBodyStyle,
  newContactElementStyle,
  headerStyle,
  headerLinkStyle,
} from './appStyle';
import { Contact } from './components/contact/Contact';
import { NewContactModal } from './components/newContactModal/NewContactModal';
import { ConfirmationModal } from './components/confirmationModal/ConfirmationModal';
import { StorageApi } from './storage/storageApi';
import { validateContact } from './utils/contactValidation';

// Screen readers
ReactModal.setAppElement('#root');
export class App extends Component {
  storageApi = new StorageApi();

  state = {
    isFormModalOpen: false,
    isConfirmationModalOpen: false,
    contactToEdit: undefined,
    contactToDelete: undefined,
    contacts: [],
    contactFormErrors: [],
  };

  componentDidMount() {
    this.refreshContacts();
  }

  refreshContacts = () => {
    this.storageApi.retrieveAllContacts().then(contacts => {
      this.setState({
        contacts,
        isFormModalOpen: false,
        isConfirmationModalOpen: false,
        contactFormErrors: [],
        contactToDelete: undefined,
      });
    });
  };

  editContact = contactId => {
    this.setState(prevState => ({
      contactToEdit: prevState.contacts.find(
        contact => contactId === contact.id
      ),
      isFormModalOpen: true,
    }));
  };

  removeContact = contactId => {
    this.setState({
      contactToDelete: contactId,
      isConfirmationModalOpen: true,
    });
  };

  confirmDelete = () => {
    this.storageApi.deleteContact(this.state.contactToDelete);
    this.refreshContacts();
  };

  cancelDelete = () => {
    this.setState({
      isConfirmationModalOpen: false,
      contactToDelete: undefined,
    });
  };

  setIsModalOpen = newModalState => () =>
    this.contactFormModalStateHandler(newModalState);

  contactFormModalStateHandler = modalState => {
    this.setState({
      isFormModalOpen: modalState,
      contactToEdit: undefined,
      contactFormErrors: [],
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

  renderContactFormModal = () =>
    this.state.isFormModalOpen ? (
      <NewContactModal
        isOpen={this.state.isFormModalOpen}
        handleClose={this.setIsModalOpen(false)}
        onContactSave={this.onContactSave}
        contactToEdit={this.state.contactToEdit}
        formErrors={this.state.contactFormErrors}
      />
    ) : null;

  renderConfirmationModal = () =>
    this.state.isConfirmationModalOpen ? (
      <ConfirmationModal
        isOpen={this.state.isConfirmationModalOpen}
        onConfirm={this.confirmDelete}
        onCancel={this.cancelDelete}
      />
    ) : null;

  render() {
    return (
      <>
        <div className={headerStyle}>
          <div>REACT ADDRESS BOOK</div>
          <div onClick={this.setIsModalOpen(true)} className={headerLinkStyle}>
            New Contact
          </div>
        </div>
        <div className={appBodyStyle}>
          <div>{this.renderContacts()}</div>
          <div
            className={newContactElementStyle}
            onClick={this.setIsModalOpen(true)}
            title="New Contact"
          >
            <FontAwesomeIcon icon="user-plus" />
          </div>

          {this.renderContactFormModal()}
          {this.renderConfirmationModal()}
        </div>
      </>
    );
  }
}

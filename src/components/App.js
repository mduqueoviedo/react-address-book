import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  appBodyStyle,
  newContactElementStyle,
  headerStyle,
  headerLinkStyle,
  searchInputStyle,
  noContactsLabelStyle,
  newContactTextStyle,
} from './appStyle';
import { Contact } from './contact/Contact';
import { NewContactModal } from './newContactModal/NewContactModal';
import { ConfirmationModal } from './confirmationModal/ConfirmationModal';
import { StorageApiFactory } from '../storage/storageApiFactory';
import { validateContact } from '../utils/contactValidation';

export class App extends Component {
  storageApi = StorageApiFactory();

  state = {
    isFormModalOpen: false,
    isConfirmationModalOpen: false,
    contactToEdit: undefined,
    contactToDelete: undefined,
    contacts: [],
    contactFormErrors: [],
    searchTerm: '',
  };

  componentDidMount() {
    this.refreshContacts();
  }

  refreshContacts = () => {
    const apiCall =
      this.state.searchTerm !== ''
        ? this.storageApi.searchContacts(this.state.searchTerm)
        : this.storageApi.retrieveAllContacts();

    apiCall.then(contacts => {
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

  renderNoContactsInfo = () =>
    this.state.searchTerm ? (
      'No contacts found'
    ) : (
      <>
        No contacts stored (yet)
        <span
          onClick={this.setIsModalOpen(true)}
          className={newContactTextStyle}
        >
          Create one?
        </span>
      </>
    );

  renderContacts = () =>
    this.state.contacts.length > 0 ? (
      this.state.contacts.map(contact => (
        <Contact
          contactData={contact}
          key={contact.id}
          onEdit={this.editContact}
          onDelete={this.removeContact}
        />
      ))
    ) : (
      <div className={noContactsLabelStyle}>{this.renderNoContactsInfo()}</div>
    );

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

  handleSearch = event => {
    this.setState(
      {
        searchTerm: event.target.value,
      },
      this.refreshContacts
    );
  };

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
          <div>
            <input
              type="text"
              value={this.state.searchTerm}
              onChange={this.handleSearch}
              placeholder="Search contacts"
              className={searchInputStyle}
            />
          </div>
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

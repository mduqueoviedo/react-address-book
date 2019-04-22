import React, { Component } from 'react';
import ReactModal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { rootStyle, newContactElementStyle } from './appStyle';
import { Contact } from './components/contact/Contact';
import { NewContactModal } from './components/newContactModal/NewContactModal';
import { StorageApi } from './storage/storageApi';

// Screen readers
ReactModal.setAppElement('#root');
export class App extends Component {
  storageApi = new StorageApi();

  state = {
    isModalOpen: false,
    contactToEdit: undefined,
    contacts: [],
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

  setIsModalOpen = newModalState => () => this.modalStateHandler(newModalState);

  modalStateHandler = modalState => {
    this.setState(prevState => {
      return {
        isModalOpen: modalState,
        contactToEdit: modalState ? prevState.contactToEdit : undefined,
      };
    });
  };

  onContactSave = newContact => {
    this.storageApi.saveContact(newContact);
    this.refreshContacts();
  };

  renderModal = () =>
    this.state.isModalOpen ? (
      <NewContactModal
        isOpen={this.state.isModalOpen}
        handleClose={this.setIsModalOpen(false)}
        onContactSave={this.onContactSave}
        contactToEdit={this.state.contactToEdit}
      />
    ) : null;

  render() {
    return (
      <>
        <div className={rootStyle}>
          <h1>Hello World from React boilerplate</h1>
        </div>
        <div>{this.renderContacts()}</div>
        <div
          className={newContactElementStyle}
          onClick={this.setIsModalOpen(true)}
        >
          <FontAwesomeIcon icon="user-plus" />
        </div>

        {this.renderModal()}
      </>
    );
  }
}

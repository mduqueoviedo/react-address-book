import React, { Component } from 'react';
import ReactModal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { rootStyle, newEntryElementStyle } from './appStyle';
import { Entry } from './components/entry/Entry';
import { NewEntryModal } from './components/newEntryModal/NewEntryModal';
import { StorageApi } from './storage/storageApi';

// Screen readers
ReactModal.setAppElement('#root');
export class App extends Component {
  storageApi = new StorageApi();

  state = {
    isModalOpen: false,
    editingEntry: undefined,
    entries: [],
  };

  componentDidMount() {
    this.refreshEntries();
  }

  refreshEntries = () => {
    this.storageApi.retrieveAllEntries().then(entries => {
      this.setState({ entries, isModalOpen: false });
    });
  };

  editEntry = entryKey => {
    this.setState(prevState => ({
      editingEntry: prevState.entries.find(entry => entryKey === entry.id),
      isModalOpen: true,
    }));
  };

  removeEntry = entryKey => {
    this.storageApi.deleteEntry(entryKey);
    this.refreshEntries();
  };

  renderEntries = () =>
    this.state.entries.length > 0
      ? this.state.entries.map(entry => (
          <Entry
            entry={entry}
            key={entry.id}
            onEdit={this.editEntry}
            onDelete={this.removeEntry}
          />
        ))
      : null;

  setIsModalOpen = newModalState => () => this.modalStateHandler(newModalState);

  modalStateHandler = modalState => {
    this.setState(prevState => {
      return {
        isModalOpen: modalState,
        editingEntry: modalState ? prevState.editingEntry : undefined,
      };
    });
  };

  onEntrySave = newEntry => {
    this.storageApi.saveEntry(newEntry);
    this.refreshEntries();
  };

  renderModal = () =>
    this.state.isModalOpen ? (
      <NewEntryModal
        isOpen={this.state.isModalOpen}
        handleClose={this.setIsModalOpen(false)}
        onEntrySave={this.onEntrySave}
        entryToEdit={this.state.editingEntry}
      />
    ) : null;

  render() {
    return (
      <>
        <div className={rootStyle}>
          <h1>Hello World from React boilerplate</h1>
        </div>
        <div>{this.renderEntries()}</div>
        <div
          className={newEntryElementStyle}
          onClick={this.setIsModalOpen(true)}
        >
          <FontAwesomeIcon icon="user-plus" />
        </div>

        {this.renderModal()}
      </>
    );
  }
}

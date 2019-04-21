import React, { Component } from 'react';
import ReactModal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import uuid from 'uuidv4';
import { rootStyle, newEntryElementStyle } from './appStyle';
import { Entry } from './components/entry/Entry';
import { deleteProperty } from './utils/objectUtils';
import { NewEntryModal } from './components/newEntryModal/NewEntryModal';

// Screen readers
ReactModal.setAppElement('#root');
export class App extends Component {
  state = {
    isModalOpen: false,
    editingEntry: undefined,
    entries: {
      // TODO: Remove in production
      '1b3a44ae-946b-4de4-aa00-a121c30826c5': {
        firstName: 'Holi',
        lastName: 'Holi2',
        email: 'email',
        country: 'es',
      },
    },
  };

  editEntry = entryKey => {
    this.setState(prevState => {
      return {
        editingEntry: { ...prevState.entries[entryKey], id: entryKey },
        isModalOpen: true,
      };
    });
  };

  removeEntry = entryKey => {
    this.setState(prevState => {
      return {
        entries: deleteProperty(prevState.entries, entryKey),
      };
    });
  };

  renderEntries = () =>
    Object.keys(this.state.entries).length > 0
      ? Object.keys(this.state.entries).map(entryKey => (
          <Entry
            entry={this.state.entries[entryKey]}
            entryKey={entryKey}
            key={entryKey}
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
    const entryId = newEntry.id !== '' ? newEntry.id : uuid();
    this.setState(prevState => {
      return {
        entries: { ...prevState.entries, [entryId]: newEntry },
        isModalOpen: false,
        editingEntry: undefined,
      };
    });
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

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
    entries: {
      '1': {
        firstName: 'Holi',
        lastName: 'Holi2',
        email: 'email',
        country: 'es',
      },
    },
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
            onDelete={this.removeEntry}
          />
        ))
      : null;

  setIsModalOpen = newModalState => {
    return () => this.modalStateHandler(newModalState);
  };

  modalStateHandler = modalState => {
    this.setState({
      isModalOpen: modalState,
    });
  };

  onEntrySave = newEntry => {
    const newEntryId = uuid();
    // eslint-disable-next-line react/no-access-state-in-setstate
    const oldEntries = this.state.entries;
    oldEntries[newEntryId] = newEntry;

    this.setState(prevState => {
      return { entries: { ...prevState.entries, [newEntryId]: newEntry } };
    });
  };

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

        <NewEntryModal
          isOpen={this.state.isModalOpen}
          handleClose={this.setIsModalOpen(false)}
          onEntrySave={this.onEntrySave}
        />
      </>
    );
  }
}

import React from 'react';
import { rootStyle } from './appStyle';
import { Entry } from './components/entry/Entry';
import { deleteProperty } from './utils/objectUtils';

export class App extends React.Component {
  state = {
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
        entries: deleteProperty(prevState.entries, Number(entryKey)),
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

  render() {
    return (
      <>
        <div className={rootStyle}>
          <h1>Hello World from React boilerplate</h1>
        </div>
        <div>{this.renderEntries()}</div>
      </>
    );
  }
}

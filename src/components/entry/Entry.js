import React from 'react';
import PropTypes from 'prop-types';

export class Entry extends React.Component {
  onDeleteHandler = event => {
    this.props.onDelete(event.target.dataset.entryKey);
  };

  render() {
    const { firstName, lastName, email, country } = this.props.entry;
    return (
      <div>
        <div>
          {firstName} {lastName}
        </div>
        <div>{email}</div>
        <div>{country}</div>

        <div
          onClick={this.onDeleteHandler}
          data-entry-key={this.props.entryKey}
        >
          Delete
        </div>
      </div>
    );
  }
}

Entry.propTypes = {
  entryKey: PropTypes.string.isRequired,
  entry: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

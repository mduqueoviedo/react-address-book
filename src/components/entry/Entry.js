import React from 'react';
import PropTypes from 'prop-types';

export class Entry extends React.Component {
  onEditHandler = event => {
    this.props.onEdit(event.target.dataset.entryKey);
  };

  onDeleteHandler = event => {
    this.props.onDelete(event.target.dataset.entryKey);
  };

  render() {
    const { id, firstName, lastName, email, country } = this.props.entry;
    return (
      <div>
        <div>
          {firstName} {lastName}
        </div>
        <div>{email}</div>
        <div>{country}</div>

        <div onClick={this.onEditHandler} data-entry-key={id}>
          Edit
        </div>
        <div onClick={this.onDeleteHandler} data-entry-key={id}>
          Delete
        </div>
      </div>
    );
  }
}

Entry.propTypes = {
  entry: PropTypes.shape({
    id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

import React from 'react';
import PropTypes from 'prop-types';

export class Contact extends React.Component {
  onEditHandler = event => {
    this.props.onEdit(event.target.dataset.contactId);
  };

  onDeleteHandler = event => {
    this.props.onDelete(event.target.dataset.contactId);
  };

  render() {
    const { id, firstName, lastName, email, country } = this.props.contactData;
    return (
      <div>
        <div>
          {firstName} {lastName}
        </div>
        <div>{email}</div>
        <div>{country}</div>

        <div onClick={this.onEditHandler} data-contact-id={id}>
          Edit
        </div>
        <div onClick={this.onDeleteHandler} data-contact-id={id}>
          Delete
        </div>
      </div>
    );
  }
}

Contact.propTypes = {
  contactData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

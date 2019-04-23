import React from 'react';
import PropTypes from 'prop-types';
import { getName } from 'country-list';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  contactCardStyle,
  editContactContainerStyle,
  editContactIconStyle,
  contactCardIconStyle,
  contactLineStyle,
  mailLinkStyle,
  contactInfoContainerStyle,
} from './contactStyle';

export class Contact extends React.Component {
  onEditHandler = event => {
    this.props.onEdit(event.currentTarget.dataset.contactId);
  };

  onDeleteHandler = event => {
    this.props.onDelete(event.currentTarget.dataset.contactId);
  };

  render() {
    const { id, firstName, lastName, email, country } = this.props.contactData;
    return (
      <div className={contactCardStyle}>
        <div className={contactInfoContainerStyle}>
          <div className={contactLineStyle}>
            <FontAwesomeIcon
              icon={['far', 'user']}
              className={contactCardIconStyle}
            />
            {`${firstName} ${lastName}`}
          </div>
          <div className={contactLineStyle}>
            <FontAwesomeIcon
              icon={['far', 'envelope']}
              className={contactCardIconStyle}
            />
            <a
              href={`mailto:${email}`}
              target="_blank"
              rel="noopener noreferrer"
              className={mailLinkStyle}
            >
              {email}
            </a>
          </div>
          <div className={contactLineStyle}>
            <FontAwesomeIcon
              icon="globe-europe"
              className={contactCardIconStyle}
            />
            {getName(country) || country}
          </div>
        </div>

        <div className={editContactContainerStyle}>
          <div
            onClick={this.onEditHandler}
            data-contact-id={id}
            className={editContactIconStyle}
            title="Edit Contact"
          >
            <FontAwesomeIcon icon="edit" />
          </div>
          <div
            onClick={this.onDeleteHandler}
            data-contact-id={id}
            className={editContactIconStyle}
            title="Delete Contact"
          >
            <FontAwesomeIcon icon="trash-alt" />
          </div>
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

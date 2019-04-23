import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import { getCodeList } from 'country-list';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { classes } from 'typestyle';
import {
  modalOverlayStyle,
  modalContainerStyle,
  closeControlStyle,
  modalStyle,
  formGroupStyle,
  formInputStyle,
  formSelectStyle,
  submitButtonStyle,
  formStyle,
  formNoteStyle,
  invalidInputStyle,
  errorDescriptionStyle,
} from './newContactModalStyle';

export class NewContactModal extends Component {
  constructor(props) {
    super(props);
    this.state =
      this.props.contactToEdit !== undefined
        ? { ...this.props.contactToEdit }
        : { id: '', firstName: '', lastName: '', email: '', country: '' };
  }

  handleFormInputChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  handleSubmitContact = () => {
    this.props.onContactSave(this.state);
  };

  renderCountryOptions = () => {
    const countryItems = getCodeList();

    return Object.keys(countryItems).map(countryCode => (
      <option value={countryCode} key={countryCode}>
        {countryItems[countryCode]}
      </option>
    ));
  };

  renderInputClass = (inputName, inputClass) =>
    this.props.formErrors.filter(
      item => item[inputName] && item[inputName] !== ''
    ).length > 0
      ? classes(inputClass, invalidInputStyle)
      : formInputStyle;

  renderErrors = () =>
    this.props.formErrors.length > 0
      ? this.props.formErrors.map(error =>
          Object.keys(error).map(errorKey => (
            <div
              className={errorDescriptionStyle}
              key={`${errorKey}${error[errorKey]}`}
            >{`${errorKey} is ${error[errorKey]}`}</div>
          ))
        )
      : null;

  render = () => (
    <ReactModal
      isOpen={this.props.isOpen}
      onRequestClose={this.props.handleClose}
      style={{
        overlay: modalOverlayStyle,
        content: modalStyle,
      }}
    >
      <div className={modalContainerStyle}>
        <form noValidate className={formStyle}>
          <input
            type="hidden"
            name="id"
            value={this.state.id}
            onChange={this.handleFormInputChange}
          />
          <div className={formGroupStyle}>
            First Name:
            <input
              type="text"
              name="firstName"
              value={this.state.firstName}
              onChange={this.handleFormInputChange}
              className={this.renderInputClass('firstName', formInputStyle)}
            />
          </div>

          <div className={formGroupStyle}>
            Last Name:
            <input
              type="text"
              name="lastName"
              value={this.state.lastName}
              onChange={this.handleFormInputChange}
              className={this.renderInputClass('lastName', formInputStyle)}
            />
          </div>

          <div className={formGroupStyle}>
            Email:
            <input
              type="text"
              name="email"
              value={this.state.email}
              onChange={this.handleFormInputChange}
              className={this.renderInputClass('email', formInputStyle)}
            />
          </div>
          <div className={formGroupStyle}>
            Country:
            <select
              name="country"
              value={this.state.country}
              onChange={this.handleFormInputChange}
              className={this.renderInputClass('country', formSelectStyle)}
            >
              {this.renderCountryOptions()}
            </select>
          </div>
          <button
            type="button"
            onClick={this.handleSubmitContact}
            className={submitButtonStyle}
          >
            Submit
          </button>
          <div className={formNoteStyle}>All fields are required</div>
          <div>{this.renderErrors()}</div>
        </form>
        <div onClick={this.props.handleClose} className={closeControlStyle}>
          <FontAwesomeIcon icon="times" />
        </div>
      </div>
    </ReactModal>
  );
}

NewContactModal.propTypes = {
  contactData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
  }),
  isOpen: PropTypes.bool.isRequired,
  onContactSave: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  formErrors: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string))
    .isRequired,
};

NewContactModal.defaultProps = {
  contactData: { id: '', firstName: '', lastName: '', email: '', country: '' },
};

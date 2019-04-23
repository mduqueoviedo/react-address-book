import React, { Component } from 'react';
import ReactModal from 'react-modal';
import { getCodeList } from 'country-list';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  modalOverlayStyle,
  modalContainerStyle,
  closeControlStyle,
  modalStyle,
  formGroupStyle,
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
      <option value={countryCode}>{countryItems[countryCode]}</option>
    ));
  };

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
        <div onClick={this.props.handleClose} className={closeControlStyle}>
          <FontAwesomeIcon icon="times" />
        </div>
        <form noValidate>
          <input
            type="hidden"
            name="id"
            value={this.state.id}
            onChange={this.handleFormInputChange}
          />
          <div className={formGroupStyle}>
            First Name
            <input
              type="text"
              name="firstName"
              value={this.state.firstName}
              onChange={this.handleFormInputChange}
            />
          </div>

          <div className={formGroupStyle}>
            Last Name
            <input
              type="text"
              name="lastName"
              value={this.state.lastName}
              onChange={this.handleFormInputChange}
            />
          </div>

          <div className={formGroupStyle}>
            Email
            <input
              type="text"
              name="email"
              value={this.state.email}
              onChange={this.handleFormInputChange}
            />
          </div>
          <div className={formGroupStyle}>
            Country
            <select
              name="country"
              value={this.state.country}
              onChange={this.handleFormInputChange}
            >
              {this.renderCountryOptions()}
            </select>
          </div>
          <button type="button" onClick={this.handleSubmitContact}>
            Submit
          </button>
        </form>
      </div>
    </ReactModal>
  );
}

import React, { Component } from 'react';
import ReactModal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  modalOverlayStyle,
  modalContainerStyle,
  closeControlStyle,
  modalStyle,
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
          First Name
          <input
            type="text"
            name="firstName"
            value={this.state.firstName}
            onChange={this.handleFormInputChange}
          />
          <input
            type="text"
            name="lastName"
            value={this.state.lastName}
            onChange={this.handleFormInputChange}
          />
          <input
            type="text"
            name="email"
            value={this.state.email}
            onChange={this.handleFormInputChange}
          />
          <input
            type="text"
            name="country"
            value={this.state.country}
            onChange={this.handleFormInputChange}
          />
          <button type="button" onClick={this.handleSubmitContact}>
            Submit
          </button>
        </form>
      </div>
    </ReactModal>
  );
}

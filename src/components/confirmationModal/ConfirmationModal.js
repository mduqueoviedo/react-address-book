import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  modalOverlayStyle,
  modalContainerStyle,
  modalStyle,
  buttonStyle,
  confirmationTextStyle,
  warningIconStyle,
} from './confirmationModalStyle';

export class ConfirmationModal extends Component {
  renderButtons = () =>
    [true, false].map(buttonValue => (
      <button
        type="button"
        className={buttonStyle}
        onClick={buttonValue ? this.props.onConfirm : this.props.onCancel}
        key={buttonValue}
      >
        {buttonValue ? 'Yes' : 'No'}
      </button>
    ));

  render() {
    return (
      <ReactModal
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onCancel}
        style={{
          overlay: modalOverlayStyle,
          content: modalStyle,
        }}
      >
        <div className={modalContainerStyle}>
          <FontAwesomeIcon
            icon="exclamation-triangle"
            className={warningIconStyle}
          />

          <div className={confirmationTextStyle}>
            Do you really want to delete this contact?
          </div>
          <div>{this.renderButtons()}</div>
        </div>
      </ReactModal>
    );
  }
}

ConfirmationModal.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

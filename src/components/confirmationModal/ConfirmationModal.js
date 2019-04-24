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
          <div>
            <button
              type="button"
              className={buttonStyle}
              onClick={this.props.onConfirm}
            >
              Yes
            </button>
            <button
              type="button"
              className={buttonStyle}
              onClick={this.props.onCancel}
            >
              No
            </button>
          </div>
        </div>
      </ReactModal>
    );
  }
}

ConfirmationModal.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

import React from 'react';
import { shallow } from 'enzyme';
import { NewContactModal } from './NewContactModal';

const emptyContactData = {
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  country: ''
};

const prefilledContactData = {
  id: '1234',
  firstName: 'Name 1',
  lastName: 'Last Name 1',
  email: 'email1@example.com',
  country: 'es'
};

describe('NewContactModal', () => {
  const mockedContactSave = jest.fn();
  const mockedHandleClose = jest.fn();
  const modal = shallow(
    <NewContactModal 
      isOpen={true} 
      contactToEdit={emptyContactData}
      onContactSave={mockedContactSave}
      handleClose={mockedHandleClose}
      formErrors={[]}
      />
  );

  it('renders NewContactModal', () => {
    expect(modal.exists()).toBe(true); 
  });

  it('will try to be closed when clicking on close button', () => {
    const closeButton = modal.find('div[title="Close"]');
    closeButton.simulate('click');

    expect(mockedHandleClose).toHaveBeenCalled();
  });

  describe("new contact", () => {
    it('renders empty form', () => {
      const firstNameInput = modal.find('input[name="firstName"]');
      const lastNameInput = modal.find('input[name="lastName"]');
      const emailInput = modal.find('input[name="email"]');
      const countryInput = modal.find('select[name="country"]');

      expect(firstNameInput.props().value).toEqual('');
      expect(lastNameInput.props().value).toEqual('');
      expect(emailInput.props().value).toEqual('');
      expect(countryInput.props().value).toEqual('');
    });
  });

  describe("edit contact", () => {
    const filledContactModal = shallow(
      <NewContactModal 
        isOpen={true} 
        contactToEdit={prefilledContactData}
        onContactSave={mockedContactSave}
        handleClose={mockedHandleClose}
        formErrors={[]}
        />
    );

    it('renders prefilled form', () => {
      const firstNameInput = filledContactModal.find('input[name="firstName"]');
      const lastNameInput = filledContactModal.find('input[name="lastName"]');
      const emailInput = filledContactModal.find('input[name="email"]');
      const countryInput = filledContactModal.find('select[name="country"]');

      expect(firstNameInput.props().value).toEqual(prefilledContactData.firstName);
      expect(lastNameInput.props().value).toEqual(prefilledContactData.lastName);
      expect(emailInput.props().value).toEqual(prefilledContactData.email);
      expect(countryInput.props().value).toEqual(prefilledContactData.country);
    });
  });
});

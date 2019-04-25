import React from 'react';
import { shallow } from 'enzyme';
import { ConfirmationModal } from './ConfirmationModal';

describe('Confirmation Modal', () => {
  const mockedOnConfirm = jest.fn();
  const mockedOnCancel = jest.fn();
  const modal = shallow(
    <ConfirmationModal 
      onConfirm={mockedOnConfirm} 
      onCancel={mockedOnCancel}/>
  );

  it('Renders Confirmation modal', () => {
    expect(modal.exists()).toBe(true); 
  });

  it('click on Yes will trigger onConfirm', () => {
    const confirmButton = modal.find('button').at(0);
    confirmButton.simulate('click');
    
    expect(confirmButton.text()).toEqual('Yes');
    expect(mockedOnConfirm).toHaveBeenCalled();
  });

  it('click on No will trigger onCancel', () => {
    const confirmButton = modal.find('button').at(1);
    confirmButton.simulate('click');
    
    expect(confirmButton.text()).toEqual('No');
    expect(mockedOnCancel).toHaveBeenCalled();
  })
});

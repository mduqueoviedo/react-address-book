import React from 'react';
import { shallow } from 'enzyme';
import { App } from './App';

jest.mock('./storage/storageApi.js', () => ({
  StorageApi: () => ({
    retrieveAllContacts: () => Promise.resolve(jest.fn())
  }) 
}));

describe('Base App component', () => {
  it('renders correctly', () => {
    const appComponent = shallow(<App />);

    expect(appComponent.exists()).toBe(true);
    expect(appComponent.find('div > div').at(0).text()).toEqual("REACT ADDRESS BOOK");
    expect(appComponent.find('div > div').at(1).text()).toEqual("New Contact");
  });

  it('opens new contact form when clicking on new contact link', () => {
    const appComponent = shallow(<App />);
    const newContactLink = appComponent.find('div > div').at(1);
    newContactLink.simulate('click');

    expect(appComponent.state().isFormModalOpen).toBe(true);
  });
});

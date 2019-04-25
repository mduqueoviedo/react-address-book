import React from 'react';
import { shallow } from 'enzyme';
import { App } from './App';
import { Contact } from './contact/Contact'; 

const contactsList = [
  {
    id: '1234',
    firstName: 'Name 1',
    lastName: 'Last Name 1',
    email: 'email1@example.com',
    country: 'es'
  },
  {
    id: '5678',
    firstName: 'Name 2',
    lastName: 'Last Name 2',
    email: 'email2@example.com',
    country: 'uk'
  },
  {
    id: '9012',
    firstName: 'Name 3',
    lastName: 'Last Name 3',
    email: 'email3@example.com',
    country: 'fr'
  }
]

const mockedRetrieveContacts = jest.fn().mockReturnValue(contactsList);

global.console.error = jest.fn();

jest.mock('../storage/storageApi.js', () => ({
  StorageApi: () => ({
    retrieveAllContacts: () => Promise.resolve(mockedRetrieveContacts)
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

  it("shows as many cards as contacts there are", () => {
    const appComponent = shallow(<App />);
    appComponent.setState({ contacts: contactsList});

    expect(appComponent.find(Contact).length).toEqual(3);
  });

  it("editing a contact will open the contact form with the contact data", () => {
    // TODO
  })
});

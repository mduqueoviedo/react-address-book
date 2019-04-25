import React from 'react';
import { shallow } from 'enzyme';
import { Contact } from './Contact';

describe('Contact', () => {
  const contactData = {
    id: '1234', 
    firstName: 'testName', 
    lastName: 'testLastName', 
    email: 'test@test.com', 
    country: 'es'
  };
  
  const onDelete = jest.fn();
  const onEdit = jest.fn();
  
  const contactComponent = shallow(
    <Contact contactData={contactData} onDelete={onDelete} onEdit={onEdit}/>
  );
  
  it('renders the component', () => {
    expect(contactComponent.exists()).toBe(true);
    const nameLabel = contactComponent.find('div > div').at(2).text();
    const emailLabel = contactComponent.find('div > div').at(3).text();

    expect(nameLabel).toMatch(/testName testLastName/);
    expect(emailLabel).toMatch(/test@test.com/);
  });

  it('shows the proper country name', () => {
    const countryLabel = contactComponent.find('div > div').at(4).text();
    expect(countryLabel).toMatch(/Spain/);
  });

  it("will call the specific prop action when clicking on edit icon", () => {
    const editIcon = contactComponent.find('div[title="Edit Contact"]');
    editIcon.simulate('click', {currentTarget: {dataset: {contactId: '1234'}}});
    expect(onEdit).toHaveBeenCalled();
  });

  it("will call the specific prop action when clicking on delete icon", () => {
    const deleteIcon = contactComponent.find('div[title="Delete Contact"]');
    deleteIcon.simulate('click', {currentTarget: {dataset: {contactId: '1234'}}});
    expect(onDelete).toHaveBeenCalled();
  });
});

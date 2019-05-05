import { DbWrapper } from './dbWrapper';

export const StorageApiFactory = () => {
  const dbWrapper = new DbWrapper();

  const retrieveAllContacts = () => dbWrapper.retrieveAllContacts();

  const searchContacts = searchTerm => dbWrapper.searchContacts(searchTerm);

  const deleteContact = contactId => dbWrapper.deleteContact(contactId);

  const saveContact = contactInfo => dbWrapper.saveContact(contactInfo);

  return {
    retrieveAllContacts,
    searchContacts,
    deleteContact,
    saveContact,
  };
};

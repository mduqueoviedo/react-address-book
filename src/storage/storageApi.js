import { DbWrapper } from './dbWrapper';

export class StorageApi {
  constructor() {
    this.dbWrapper = new DbWrapper();
  }

  retrieveAllContacts = () => this.dbWrapper.retrieveAllContacts();

  searchContacts = searchTerm => this.dbWrapper.searchContacts(searchTerm);

  deleteContact = contactId => {
    return this.dbWrapper.deleteContact(contactId);
  };

  saveContact = contactInfo => {
    return this.dbWrapper.saveContact(contactInfo);
  };
}

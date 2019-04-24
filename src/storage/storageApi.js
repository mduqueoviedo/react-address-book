import { DbWrapper } from './dbWrapper';

export class StorageApi {
  constructor() {
    this.dbWrapper = new DbWrapper();
  }

  retrieveAllContacts = () => this.dbWrapper.retrieveAllContacts();

  deleteContact = contactId => {
    return this.dbWrapper.deleteContact(contactId);
  };

  saveContact = contactInfo => {
    return this.dbWrapper.saveContact(contactInfo);
  };
}

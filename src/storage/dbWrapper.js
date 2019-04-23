import uuid from 'uuidv4';
import db from './dbSchema';

export class DbWrapper {
  retrieveAllContacts = () =>
    db.contacts.orderBy('lastName', 'firstName').toArray();

  deleteContact = contactId => {
    db.contacts.delete(contactId);
  };

  saveContact = contactInfo => {
    if (contactInfo.id) {
      db.contacts.update(contactInfo.id, { ...contactInfo });
    } else {
      db.contacts.add({ ...contactInfo, id: uuid() });
    }
  };
}

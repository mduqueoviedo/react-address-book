import uuid from 'uuidv4';
import db from './dbSchema';
import { sortContacts } from '../utils/sortContacts';

export class DbWrapper {
  retrieveAllContacts = () =>
    Promise.resolve(db.contacts.toArray()).then(contacts =>
      sortContacts(contacts)
    );

  searchContacts = searchTerm => {
    const foundContacts = [];
    ['firstName', 'lastName', 'email', 'country'].forEach(field => {
      foundContacts.push(
        db.contacts
          .where(field)
          .startsWithIgnoreCase(searchTerm)
          .toArray()
      );
    });

    return Promise.all(foundContacts).then(results =>
      sortContacts(
        results
          .reduce((acc, current) => acc.concat(current), [])
          .reduce((acc, current) => {
            if (!acc.find(record => record.id === current.id)) {
              acc.push(current);
            }
            return acc;
          }, [])
      )
    );
  };

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

import uuid from 'uuidv4';
import db from './dbSchema';

export class DbWrapper {
  retrieveAllContacts = () =>
    db.contacts.orderBy('lastName', 'firstName').toArray();

  searchContacts = searchTerm => {
    const foundContacts = [];
    ['firstName', 'lastName', 'email'].forEach(field => {
      foundContacts.push(
        db.contacts
          .where(field)
          .startsWithIgnoreCase(searchTerm)
          .toArray()
      );
    });

    return Promise.all(foundContacts).then(results => {
      const nonRepeatedResults = results
        .reduce((acc, current) => acc.concat(current), [])
        .reduce((acc, current) => {
          if (!acc.find(record => record.id === current.id)) {
            acc.push(current);
          }
          return acc;
        }, []);

      return nonRepeatedResults;
    });
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

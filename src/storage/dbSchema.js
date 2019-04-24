import Dexie from 'dexie';

const db = new Dexie('react-address-book');

db.version(1).stores({
  contacts: '&id, firstName, lastName, email, country',
});

export default db;

import Dexie from 'dexie';
// import uuid from 'uuidv4';

const db = new Dexie('react-address-book');

db.version(1).stores({
  entries: '&id, firstName, lastName, email, country',
});

/* 
db.entries.clear();

db.entries.bulkAdd([
  {
    id: uuid(),
    firstName: 'Name 1',
    lastName: 'Last Name 1',
    email: 'mail1@example.com',
    country: 'es',
  },
  {
    id: uuid(),
    firstName: 'Name 2',
    lastName: 'Last Name 2',
    email: 'mail2@example.com',
    country: 'en',
  },
  {
    id: uuid(),
    firstName: 'Name 3',
    lastName: 'Last Name 3',
    email: 'mail3@example.com',
    country: 'es',
  },
]);

*/

export default db;

import uuid from 'uuidv4';
import db from './dbSchema';

export class DbWrapper {
  retrieveAllEntries = () => db.entries.toArray();

  deleteEntry = entryKey => {
    db.entries.delete(entryKey);
  };

  saveEntry = entryData => {
    if (entryData.id) {
      db.entries.update(entryData.id, { ...entryData });
    } else {
      db.entries.add({ ...entryData, id: uuid() });
    }
  };
}

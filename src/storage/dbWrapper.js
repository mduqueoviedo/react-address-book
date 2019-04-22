import db from './dbSchema';

export class DbWrapper {
  retrieveAllEntries = () => db.entries.toArray();

  deleteEntry = entryKey => {
    db.entries
      .where('id')
      .equals(entryKey)
      .delete();
  };

  saveEntry = entryData => {
    console.log('Saving', entryData);
    // save entry (new or edit)
  };
}

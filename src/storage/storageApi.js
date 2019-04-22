import { DbWrapper } from './dbWrapper';

export class StorageApi {
  constructor() {
    this.dbWrapper = new DbWrapper();
  }

  retrieveAllEntries = () => this.dbWrapper.retrieveAllEntries();

  deleteEntry = entryKey => {
    return this.dbWrapper.deleteEntry(entryKey);
  };

  saveEntry = entryData => {
    return this.dbWrapper.saveEntry(entryData);
  };
}

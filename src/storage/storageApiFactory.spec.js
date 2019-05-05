const mockedRetrieveContacts = jest.fn();
const mockedSaveContact = jest.fn();
const mockedDeleteContact = jest.fn();

jest.mock('./dbWrapper.js', () => ({
  DbWrapper: () => ({
    retrieveAllContacts: mockedRetrieveContacts,
    saveContact: mockedSaveContact,
    deleteContact: mockedDeleteContact
  }) 
}));
import { StorageApiFactory } from './StorageApiFactory';

describe("Storage Api", () => {
  const storageApi = StorageApiFactory();
  it("creates an instance of the storage api", () => {
    expect(storageApi).toHaveProperty('retrieveAllContacts');
    expect(storageApi).toHaveProperty('searchContacts');
    expect(storageApi).toHaveProperty('deleteContact');
    expect(storageApi).toHaveProperty('saveContact');
  });

  it("retrieveAllContacts gets a list of contacts from dbWrapper", () => {
    storageApi.retrieveAllContacts();
    expect(mockedRetrieveContacts).toHaveBeenCalled();
  });

  it("deleteContact invokes deleteContact in dbWrapper", () => {
    storageApi.deleteContact('key');
    expect(mockedDeleteContact).toHaveBeenCalledWith('key');
  });

  it("saveContact invokes saveContact in dbWrapper", () => {
    storageApi.saveContact({});
    expect(mockedSaveContact).toHaveBeenCalledWith({});
  })
})
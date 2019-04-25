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
import { StorageApi } from './StorageApi';

describe("Storage Api", () => {
  const storageApi = new StorageApi();
  it("creates an instance of the storage api", () => {
    expect(storageApi).toBeInstanceOf(StorageApi);
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
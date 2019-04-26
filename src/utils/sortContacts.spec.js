import { sortContacts } from './sortContacts';

// Only id and firstName fields for simplicity
const unsortedContacts = [
  { id: "1", firstName: "sansa" },
  { id: "2", firstName: "jon" },
  { id: "3", firstName: "arya" }
];

const sortedContacts = [  
  { id: "3", firstName: "arya" },
  { id: "2", firstName: "jon" },
  { id: "1", firstName: "sansa" }
];

const unsortedMixedCasesContacts = [
  { id: "1", firstName: "sansa" },
  { id: "2", firstName: "jon" },
  { id: "3", firstName: "arya" },
  { id: "4", firstName: "Sansa" }
];

const sortedMixedCasesContacts = [
  { id: "3", firstName: "arya" },
  { id: "2", firstName: "jon" },
  { id: "1", firstName: "sansa" },
  { id: "4", firstName: "Sansa" }
];


describe("sortContacts", () => {
  it ("sorts the contacts from a set by firstName field", ()=> {
    expect(sortContacts(unsortedContacts)).toEqual(sortedContacts);
  });

  it ("performs case insensitive sorting", () => {
    expect(sortContacts(unsortedMixedCasesContacts)).toEqual(sortedMixedCasesContacts);
  });
});

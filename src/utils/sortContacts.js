export const sortContacts = contactSet =>
  contactSet.sort((a, b) =>
    a.firstName.localeCompare(b.firstName, undefined, {
      sensitivity: 'base',
    })
  );

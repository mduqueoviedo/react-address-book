/**
 * Validates a contact and returns list of errors if any
 * @param {object} newContactData
 */
export const validateContact = newContactData => {
  const emailRegexp = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  const alphanumericRegexp = /\w+/gu;

  const formFields = ['firstName', 'lastName', 'email', 'country'];
  const nameFields = ['firstName', 'lastName'];
  const contactFormErrors = [];

  formFields.forEach(field => {
    if (newContactData[field] === '') {
      contactFormErrors.push({ [field]: 'required' });
    }
  });

  nameFields.forEach(nameField => {
    if (!alphanumericRegexp.test(newContactData[nameField])) {
      contactFormErrors.push({ [nameField]: 'invalid' });
    }
  });

  if (!emailRegexp.test(newContactData.email)) {
    contactFormErrors.push({ email: 'invalid' });
  }

  return contactFormErrors;
};

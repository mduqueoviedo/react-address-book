import { validateContact } from './contactValidation';

describe("validateContact", () => {
    const validContact = {
        firstName: 'Max', 
        lastName: 'Mustermann', 
        email: 'mail@example.com', 
        country: 'es'
    };

    it("returns empty array when no errors", () => {
        expect(validateContact(validContact)).toEqual([]);
    });

    it ("validates empty fields", () => {
        const invalidFirstNameContact = {...validContact, firstName: ''};
        const invalidLastNameContact = {...validContact, lastName: ''};
        const invalidEmailContact = {...validContact, email: ''};
        const invalidCountryContact = {...validContact, country: ''};
        
        expect(validateContact(invalidFirstNameContact)).toEqual([{firstName: 'required'}]);
        expect(validateContact(invalidLastNameContact)).toEqual([{lastName: 'required'}]);
        expect(validateContact(invalidEmailContact)).toEqual([{email: 'required'}, {email: 'invalid'}]);
        expect(validateContact(invalidCountryContact)).toEqual([{country: 'required'}]);
    });

    it("validates email format", () => {
        const invalidEmailContact1 = {...validContact, email: 'wrongMail'};
        const invalidEmailContact2 = {...validContact, email: 'wrongMail@mail'};
        const invalidEmailContact3 = {...validContact, email: 'wrongMail@mail.'};
        const invalidEmailContact4 = {...validContact, email: '@mail.com'};

        expect(validateContact(invalidEmailContact1)).toEqual([{email: 'invalid'}]);
        expect(validateContact(invalidEmailContact2)).toEqual([{email: 'invalid'}]);
        expect(validateContact(invalidEmailContact3)).toEqual([{email: 'invalid'}]);
        expect(validateContact(invalidEmailContact4)).toEqual([{email: 'invalid'}]);
    });
})
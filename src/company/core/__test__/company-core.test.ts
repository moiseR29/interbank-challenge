import { COMPANY_TYPES, CUIT, Name, Type } from '../params';

describe('Company Core __TEST__', () => {
  describe('validating company params', () => {
    describe('## CUIT', () => {
      test('-> cuit should have 13 characters', () => {
        const invalidCuit = '23-12345-2';
        try {
          new CUIT(invalidCuit);
        } catch (error) {
          // @ts-ignore
          expect(error.message).toBe(
            'Invalid CUIT. Should contains 13 characters',
          );
        }
      });

      test('-> cuit should not contain special characters', () => {
        const invalidCuit = '23-$%345(78-$';
        try {
          new CUIT(invalidCuit);
        } catch (error) {
          // @ts-ignore
          expect(error.message).toBe(
            'Invalid CUIT. Should not contain special characters ( allow numbers and - )',
          );
        }
      });

      test('-> cuit should contain 11 numbers', () => {
        const invalidCuit = '23-34345778-T';
        try {
          new CUIT(invalidCuit);
        } catch (error) {
          // @ts-ignore
          expect(error.message).toBe('Invalid CUIT. Must includes 11 numbers');
        }
      });

      test('-> succes case', () => {
        const cuit = '21-33292127-8';
        expect(new CUIT(cuit).value).toBe(cuit);
      });
    });

    describe('## NAME', () => {
      test('-> Invalid name, Should contains between 5 to 20 characters, it has 3', () => {
        const name = 'tax';
        try {
          new Name(name);
        } catch (error) {
          // @ts-ignore
          expect(error.message).toBe(
            'Invalid Name. Should contains between 5 to 20 characters',
          );
        }
      });

      test('-> Invalid name, Should contains between 5 to 20 characters, it has more that 20', () => {
        const name = 'Tierra del Fuego e Islas Malvinas S.A.';
        try {
          new Name(name);
        } catch (error) {
          // @ts-ignore
          expect(error.message).toBe(
            'Invalid Name. Should contains between 5 to 20 characters',
          );
        }
      });

      test('-> valid name, it has between 5 to 20 characters', () => {
        const name = 'Guitar S.A.';
        expect(new Name(name).value).toBe(name);
      });
    });

    describe('## TYPE', () => {
      test('-> Invalid type company', () => {
        const typeCompany = 'SUPER COMPANY';
        try {
          new Type(typeCompany);
        } catch (error) {
          // @ts-ignore
          expect(error.message).toBe(
            'Invalid type, only allowed Pyme and Corporative',
          );
        }
      });

      test('-> valid type company', () => {
        const typeCompany = COMPANY_TYPES.PYME;
        expect(new Type(typeCompany).value).toBe(COMPANY_TYPES.PYME);
      });
    });
  });
});

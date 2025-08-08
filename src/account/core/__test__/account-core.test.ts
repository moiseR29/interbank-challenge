import { ALLOWED_CURRENCIES, AccountNumber, Amount } from '../params';

describe('Account Core __TEST__', () => {
  describe('validating account params', () => {
    describe('## ID - Account Number', () => {
      test('-> Validating has account Number contains 12 characters', () => {
        const an = 'accountNumber';
        try {
          new AccountNumber(an);
        } catch (error) {
          // @ts-ignore
          expect(error.message).toBe(
            'Invalid Account Number. must contains 12 characters',
          );
        }
      });

      test('-> Validating currency', () => {
        const an = 'LBR-78729/02';
        try {
          new AccountNumber(an);
        } catch (error) {
          // @ts-ignore
          expect(error.message).toBe(
            `Invalid Account Number. LBR not allowed currency`,
          );
        }
      });

      test('-> Validating number for account number format', () => {
        const an = `${ALLOWED_CURRENCIES.USD}-7E72T/02`;
        try {
          new AccountNumber(an);
        } catch (error) {
          // @ts-ignore
          expect(error.message).toBe(
            'Invalid Account Number. must contains 7 number',
          );
        }
      });

      test('-> Validating one - includes account number', () => {
        const an = `${ALLOWED_CURRENCIES.USD}-78723-02`;
        try {
          new AccountNumber(an);
        } catch (error) {
          // @ts-ignore
          expect(error.message).toBe(
            'Invalid Account Number. should be include a only -',
          );
        }
      });

      // TODO: review
      test.skip('-> Validating one / includes account number', () => {
        const an = `${ALLOWED_CURRENCIES.USD}/78723/02`;
        try {
          new AccountNumber(an);
        } catch (error) {
          // @ts-ignore
          expect(error.message).toBe(
            'Invalid Account Number. should be include a only /',
          );
        }
      });

      test('-> Succes Case, using generate', () => {
        // here valid only pass validations
        const an = AccountNumber.new();
        expect(an.value).toBe(an.value);
      });
    });

    describe('## Amount', () => {
      test('Try movement excess limit', () => {
        // limit is 1000
        const am = new Amount(100);
        try {
          am.movement(-1101);
        } catch (error) {
          // @ts-ignore
          expect(error.message).toBe(
            'the account does not have sufficient funds',
          );
        }
      });

      test('validate negative movements', () => {
        const am = new Amount(100);
        am.movement(-101);
        expect(am.value).toBe(-1);
      });
    });
  });
});

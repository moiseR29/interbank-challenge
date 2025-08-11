import { ALLOWED_CURRENCIES, AccountNumber, Amount } from '../params';

describe('Core __TEST__ | Account Params', () => {
  describe('account number', () => {
    test('should return account number', () => {
      const an = AccountNumber.new();
      expect(an.value).toBe(an.value);
    });

    test('should return an error when send account with more or less character', () => {
      const account = 'USD-123456-01'; // 13
      try {
        new AccountNumber(account);
      } catch (error) {
        // @ts-ignore
        expect(error.message).toBe(
          'Invalid Account Number. must contains 12 characters',
        );
      }
    });

    test('should return an error when send account with more or less character', () => {
      const account = 'USD-1234-01'; // 11
      try {
        new AccountNumber(account);
      } catch (error) {
        // @ts-ignore
        expect(error.message).toBe(
          'Invalid Account Number. must contains 12 characters',
        );
      }
    });

    test('should return an error when send account with currency not allowed', () => {
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

    test('should return an error when send account that include letter on number part', () => {
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

    test('should return an error when account contain more that one -', () => {
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
  });

  describe('amount', () => {
    test('should return an error when debit account does not have founds and excess limit.', () => {
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

    test('should return a validate case because account does not have founds but not excess the limit', () => {
      const am = new Amount(100);
      am.movement(-101);
      expect(am.value).toBe(-1);
    });
  });
});

import { Amount } from '../params';

describe('Core __TEST__ | Transaction Params', () => {
  describe('amount', () => {
    test('Amount: should return false because amount does not be negative', () => {
      const amount = new Amount(-22);
      expect(amount.isPositive()).toBeFalsy();
    });

    test('Amount: should return value because amount is positivo', () => {
      const amount = new Amount(100);
      expect(amount.isPositive()).toBeTruthy();
    });
  });
});

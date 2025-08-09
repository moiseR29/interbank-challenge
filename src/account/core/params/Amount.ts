import { NumberValue } from '@shared/core';
import { AccountError } from '../Error';

export class Amount extends NumberValue {
  // in this case limit, is a const value, should be dinamic
  private LIMIT = -1000;

  movement(mv: number) {
    const newAmount = this._value + mv;
    if (newAmount < this.LIMIT)
      throw new AccountError('the account does not have sufficient funds');

    this._value = newAmount;
  }
}

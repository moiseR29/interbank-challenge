import { ALLOWED_CURRENCIES } from '@account/core';
import _ from 'lodash';

export class Generator {
  static accountNumber(currency: ALLOWED_CURRENCIES): string {
    const account = String(Math.floor(1000000 + Math.random() * 9999999));
    return `${currency}-${account.slice(0, 5)}/${account.slice(-2)}`;
  }
}

import { StringValue, Generator } from '@shared/core';
import { AccountError } from '../Error';

export enum ALLOWED_CURRENCIES {
  USD = 'USD',
  ARS = 'ARS',
}

// Ex: ARS-38729/01 - USD-78729/02
export class AccountNumber extends StringValue {
  constructor(value: string) {
    super(value);
    this.isValid();
  }

  private isValid() {
    const validCharacter = this._value.replace(/[^a-zA-Z0-9-/]+/g, '');
    if (validCharacter.length != 12)
      throw new InvalidAccountNumber(
        'Invalid Account Number. must contains 12 characters',
      );

    if (
      ![ALLOWED_CURRENCIES.USD, ALLOWED_CURRENCIES.ARS].includes(
        this._value.slice(0, 3) as ALLOWED_CURRENCIES,
      )
    ) {
      throw new InvalidAccountNumber(
        `Invalid Account Number. ${this._value.slice(
          0,
          3,
        )} not allowed currency`,
      );
    }

    const validateNumber = this._value.replace(/[^0-9]+/g, '');
    if (validateNumber.length != 7)
      throw new InvalidAccountNumber(
        'Invalid Account Number. must contains 7 number',
      );

    // TODO: valid if has one "-"
    const checkHas_1 = this._value.match(/[-]+/g) || [];
    if (checkHas_1.length != 1)
      throw new InvalidAccountNumber(
        'Invalid Account Number. should be include a only -',
      );

    // TODO: valid if has one "/"
    const checkHas_2 = this._value.match(/[/]+/g) || [];
    if (checkHas_2.length != 1)
      throw new InvalidAccountNumber(
        'Invalid Account Number. should be include a only /',
      );
  }

  static new(
    currency: ALLOWED_CURRENCIES = ALLOWED_CURRENCIES.USD,
  ): AccountNumber {
    return new AccountNumber(
      `${currency}-${Generator.numbersLength(5)}/${Generator.numbersLength(2)}`,
    );
  }
}

class InvalidAccountNumber extends AccountError {
  constructor(message: string) {
    super(message, 'Account Number Error');
  }
}

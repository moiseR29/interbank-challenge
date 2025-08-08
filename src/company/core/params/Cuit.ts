import { StringValue } from '@shared/core';
import { CompanyError } from '../Error';

export class CUIT extends StringValue {
  constructor(value: string) {
    super(value);
    this.isValid();
  }

  private isValid() {
    if (this._value.length != 13) {
      throw new InvalidCuit('Invalid CUIT. Should contains 13 characters');
    }

    const specialCharacters = this._value.replace(/[^a-zA-Z0-9-]/g, '');
    if (specialCharacters.length != 13) {
      throw new InvalidCuit(
        'Invalid CUIT. Should not contain special characters ( allow numbers and - )',
      );
    }

    const cuitWithOnlyNumbers = this._value.replace(/[^0-9]/g, '');
    if (cuitWithOnlyNumbers.length != 11) {
      throw new InvalidCuit('Invalid CUIT. Must includes 11 numbers');
    }
  }
}

class InvalidCuit extends CompanyError {
  constructor(message: string) {
    super(message, 'Company Cuit Error');
  }
}

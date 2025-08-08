import { StringValue } from '@shared/core';
import { CompanyError } from '../Error';

export class Name extends StringValue {
  constructor(value: string) {
    super(value);
    this.isValid();
  }

  private isValid() {
    if (this._value.length < 5 || this._value.length >= 20) {
      throw new InvalidName(
        'Invalid Name. Should contains between 5 to 20 characters',
      );
    }
  }
}

class InvalidName extends CompanyError {
  constructor(message: string) {
    super(message, 'Company Name Error');
  }
}

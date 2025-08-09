import { StringValue } from '@shared/core';
import { CompanyError } from '../Error';

export class CUIT extends StringValue {
  constructor(value: string) {
    super(value);
    this.isValid();
  }

  private isValid() {
    if (this._value.length != 13) {
      throw CompanyError.invalidCuitCharacters();
    }

    const specialCharacters = this._value.replace(/[^a-zA-Z0-9-]/g, '');
    if (specialCharacters.length != 13) {
      throw CompanyError.invalidCuitSpecialCharacters();
    }

    const cuitWithOnlyNumbers = this._value.replace(/[^0-9]/g, '');
    if (cuitWithOnlyNumbers.length != 11) {
      throw CompanyError.invalidCuitShouldBeIncludesNumbers();
    }
  }
}

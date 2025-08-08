import { StringValue } from '@shared/core';
import { CompanyError } from '../Error';

export enum COMPANY_TYPES {
  PYME = 'PYME',
  CORPORATIVE = 'CORPORATIVE',
}

export class Type extends StringValue {
  constructor(value: string) {
    super(value);
    this.isValid();
  }

  static default(): Type {
    return new Type(COMPANY_TYPES.PYME);
  }

  private isValid() {
    if (
      ![COMPANY_TYPES.PYME, COMPANY_TYPES.CORPORATIVE].includes(
        this._value as COMPANY_TYPES,
      )
    ) {
      throw new InvalidType('Invalid type, only allowed Pyme and Corporative');
    }
  }
}

class InvalidType extends CompanyError {
  constructor(message: string) {
    super(message, 'Company Type Error');
  }
}

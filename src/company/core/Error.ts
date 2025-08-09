import { MainError, STATUS_CODE } from '@shared/core';

export class CompanyError extends MainError {
  constructor(
    message: string,
    status = STATUS_CODE.BAD_REQUEST,
    name = 'Company Error',
  ) {
    super(name, message, status);
  }

  static accountDoesnotHaveCompany(accountNumber: string): CompanyError {
    return new CompanyError(
      `${accountNumber} doesnt have company`,
      STATUS_CODE.NOT_FOUND,
    );
  }

  static alreadyDefined(param: string): CompanyError {
    return new CompanyError(`Company ${param} should be exist`);
  }

  static invalidCuitCharacters(): CompanyError {
    return new CompanyError('Invalid CUIT. Should contains 13 characters');
  }

  static invalidCuitSpecialCharacters(): CompanyError {
    return new CompanyError(
      'Invalid CUIT. Should not contain special characters ( allow numbers and - )',
    );
  }

  static invalidCuitShouldBeIncludesNumbers(): CompanyError {
    return new CompanyError('Invalid CUIT. Must includes 11 numbers');
  }

  static invalidNameLength(): CompanyError {
    return new CompanyError(
      'Invalid Name. Should contains between 5 to 20 characters',
    );
  }

  static typeNowAllowed(): CompanyError {
    return new CompanyError('Invalid type, only allowed Pyme and Corporative');
  }

  static repository(
    message: string,
    status?: STATUS_CODE.BAD_REQUEST,
  ): CompanyError {
    return new CompanyError(message, status, 'Company Error Repository');
  }
}

import { MainError, STATUS_CODE } from '@shared/core';

export class AccountError extends MainError {
  constructor(
    message: string,
    status = STATUS_CODE.BAD_REQUEST,
    name = 'Account Error',
  ) {
    super(name, message, status);
  }

  static repository(
    message: string,
    status?: STATUS_CODE.BAD_REQUEST,
  ): AccountError {
    return new AccountError(message, status, 'Account Error Repository');
  }
}

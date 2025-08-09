import { MainError, STATUS_CODE } from '@shared/core';

export class TransactionError extends MainError {
  constructor(
    message: string,
    status = STATUS_CODE.BAD_REQUEST,
    name = 'Transaction Error',
  ) {
    super(name, message, status);
  }

  static accountNotFound(account: string): TransactionError {
    return new TransactionError(
      `${account} does not exists`,
      STATUS_CODE.NOT_FOUND,
    );
  }

  static alreadyRefined(param: string): TransactionError {
    return new TransactionError(`Transaction ${param} Already defined`);
  }

  static invalidState(): TransactionError {
    return new TransactionError(
      'Invalid state, only allowed Success and Failed',
    );
  }

  static repository(
    message: string,
    status: STATUS_CODE.BAD_REQUEST,
  ): TransactionError {
    return new TransactionError(
      message,
      status,
      'Transaction Error Repository',
    );
  }
}

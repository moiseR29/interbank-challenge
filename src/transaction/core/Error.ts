import { MainError } from '@shared/core';

export class TransactionError extends MainError {
  constructor(message: string, name = 'Transaction Error') {
    super(name, message);
  }
}

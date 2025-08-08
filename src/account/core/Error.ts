import { MainError } from '@shared/core';

export class AccountError extends MainError {
  constructor(message: string, name = 'Account Error') {
    super(name, message);
  }
}

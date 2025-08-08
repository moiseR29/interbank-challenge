import { MainError } from '@shared/core';

export class CompanyError extends MainError {
  constructor(message: string, name = 'Company Error') {
    super(name, message);
  }
}

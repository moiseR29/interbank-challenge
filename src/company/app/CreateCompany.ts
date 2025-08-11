import { Company, CUIT, Name, Type } from '@company/core';
import {
  CreateCompanyAction,
  CreateCompanyActionDependencies,
} from '@company/core/actions';
import {
  CreateAccountAction,
  CreateAccountDependencies,
} from '@account/core/actions';

export interface CreateCompanyApplicationDependencies
  extends CreateCompanyActionDependencies,
    CreateAccountDependencies {}

export interface CreateCompanyApplicationPayload {
  cuit: CUIT;
  name: Name;
  type: Type;
}

export class CreateCompanyApplication {
  private createCompanyAction: CreateCompanyAction;
  private createAccountAction: CreateAccountAction;

  constructor(dep: CreateCompanyApplicationDependencies) {
    this.createCompanyAction = new CreateCompanyAction(dep);
    this.createAccountAction = new CreateAccountAction(dep);
  }

  async execute(payload: CreateCompanyApplicationPayload): Promise<Company> {
    try {
      const account = await this.createAccountAction.execute();
      const company = await this.createCompanyAction.execute({
        ...payload,
        account,
      });
      return company;
    } catch (error) {
      throw error;
    }
  }
}

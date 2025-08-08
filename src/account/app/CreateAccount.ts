import { App, AppDependencies } from '@shared/app';
import { AccountRepository, Account, AccountRaw } from '@account/core';

export interface CreateAccountDependencies extends AppDependencies {
  accountRepository: AccountRepository;
}

export class CreateAccount extends App {
  private repository: AccountRepository;

  constructor(dep: CreateAccountDependencies) {
    super(dep);
    this.repository = dep.accountRepository;
  }

  async execute(): Promise<Account> {
    try {
      this.logger.info('Executing createAccounApp...');
      this.logger.log('-> Generating new Account..');
      const newAccount = Account.new();
      this.logger.log('-> Saving new Account..');
      await this.repository.save(newAccount);
      return newAccount;
    } catch (error) {
      throw error;
    }
  }
}

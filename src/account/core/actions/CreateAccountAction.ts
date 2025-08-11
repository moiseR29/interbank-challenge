import { Logger } from '@shared/core';
import { AccountRepository } from '../AccountRepository';
import { Account } from '../Account';

export interface CreateAccountDependencies {
  logger: Logger;
  accountRepository: AccountRepository;
}

/**
 * the generation account always depends only this action
 */
export class CreateAccountAction {
  constructor(private readonly dep: CreateAccountDependencies) {}

  async execute(): Promise<Account> {
    try {
      this.dep.logger.info('executing CreateAccountAction');
      this.dep.logger.log('generating new account..');
      const newAccount = Account.new();
      this.dep.logger.log('saving account');
      await this.dep.accountRepository.save(newAccount);
      return newAccount;
    } catch (error) {
      throw error;
    }
  }
}

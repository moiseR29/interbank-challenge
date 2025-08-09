import _ from 'lodash';
import {
  Account,
  AccountError,
  AccountNumber,
  AccountRepository,
  Amount,
  CreatedAt,
} from '@account/core';
import { Logger } from '@shared/core';
import { MemoryDB } from '@infra/server/express/MemoryDB';

export interface AccountMemoryRepositoryDependencies {
  logger: Logger;
  data: MemoryDB;
}

export interface SchemeAccount {
  id: string;
  amount: number;
  createdAt: string;
}

export class AccountMemoryRepository implements AccountRepository {
  private logger: Logger;
  private db: MemoryDB;

  constructor(dep: AccountMemoryRepositoryDependencies) {
    this.logger = dep.logger;
    this.db = dep.data;
  }

  async save(account: Account): Promise<Account> {
    if (this.db.account.has(account.accountNumber.value)) {
      this.logger.error('Account Already exist on database');
      throw AccountError.repository('Account Already exist on database');
    }

    this.db.account.set(account.accountNumber.value, {
      id: account.accountNumber.value,
      amount: account.amount.value,
      createdAt: account.createdAt.value.format(),
    });
    return account;
  }

  async getByAccountNumber(
    accountNumber: AccountNumber,
  ): Promise<Account | undefined> {
    if (!this.db.account.has(accountNumber.value)) return undefined;

    const acc = this.db.account.get(accountNumber.value)!;

    return new Account({
      accountNumber,
      amount: new Amount(acc.amount),
      createdAt: CreatedAt.newFromUTC(acc.createdAt),
    });
  }

  async updateAmount(account: Account): Promise<Account> {
    if (!this.db.account.has(account.accountNumber.value)) {
      this.logger.error('Account not found');
      throw AccountError.repository('Account not found');
    }

    this.db.account.set(account.accountNumber.value, {
      id: account.accountNumber.value,
      amount: account.amount.value,
      createdAt: account.createdAt.value.format(),
    });

    return account;
  }
}

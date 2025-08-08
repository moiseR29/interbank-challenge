import { Account } from '../Account';
import { AccountRepository } from '../AccountRepository';
import { AccountNumber } from '../params';

export class AccountRepositoryMock implements AccountRepository {
  getByAccountNumber(
    accountNumber: AccountNumber,
  ): Promise<Account | undefined> {
    throw new Error('Method not implemented.');
  }
  updateAmount(account: Account): Promise<Account> {
    throw new Error('Method not implemented.');
  }
  save(account: Account): Promise<Account> {
    throw new Error('Method not implemented.');
  }
}

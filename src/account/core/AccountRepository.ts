import { Account } from './Account';
import { AccountNumber } from './params';

export interface AccountRepository {
  save(account: Account): Promise<Account>;
  getByAccountNumber(
    accountNumber: AccountNumber,
  ): Promise<Account | undefined>;
  updateAmount(account: Account): Promise<Account>;
}

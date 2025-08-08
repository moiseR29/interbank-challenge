import { Account, AccountNumber, Amount, CreatedAt } from '@account/core';
import { AccountRepositoryMock } from '@account/core/__mock__';
import { CreateAccount } from '../CreateAccount';
import { TestLogger } from '@shared/core/__mock__';

describe('Create Account', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Success Account', async () => {
    const accountNumber = AccountNumber.new();
    const amount = new Amount(100);
    const createdAt = CreatedAt.new();
    const newAccount = new Account({ accountNumber, amount, createdAt });
    Account.new = jest.fn(() => newAccount);

    const logger = new TestLogger();
    logger.info = jest.fn();
    logger.log = jest.fn();

    const repository = new AccountRepositoryMock();
    repository.save = jest.fn();

    const app = new CreateAccount({ logger, accountRepository: repository });

    const savedNewAccount = await app.execute();
    expect(savedNewAccount).toBe(newAccount);
  });
});

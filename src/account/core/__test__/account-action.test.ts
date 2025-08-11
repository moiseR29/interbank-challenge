import { TestLogger } from '@shared/core/__mock__';
import { Account } from '../Account';
import { AccountNumber, Amount, CreatedAt } from '../params';
import { AccountRepositoryMock } from '../__mock__';
import { CreateAccountAction } from '../actions';

describe('Core __TEST__ | Account actions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return account when a correct params', async () => {
    const accountNumber = AccountNumber.new();
    const amount = new Amount(100);
    const createdAt = CreatedAt.new();

    const newAccount = new Account({ accountNumber, amount, createdAt });
    Account.new = jest.fn(() => newAccount);

    const logger = new TestLogger();
    logger.info = jest.fn();
    logger.log = jest.fn();
    logger.error = jest.fn();

    const accountRepository = new AccountRepositoryMock();
    accountRepository.save = jest.fn();

    const action = new CreateAccountAction({
      logger,
      accountRepository,
    });

    const savedNewAccount = await action.execute();
    expect(savedNewAccount).toBe(newAccount);
  });

  test('should return error when repository throw error', async () => {
    try {
      const accountNumber = AccountNumber.new();
      const amount = new Amount(100);
      const createdAt = CreatedAt.new();

      const newAccount = new Account({ accountNumber, amount, createdAt });
      Account.new = jest.fn(() => newAccount);

      const logger = new TestLogger();
      logger.info = jest.fn();
      logger.log = jest.fn();
      logger.error = jest.fn();

      const accountRepository = new AccountRepositoryMock();
      accountRepository.save = jest.fn(() => {
        throw new Error('error on repository');
      });

      const action = new CreateAccountAction({
        logger,
        accountRepository,
      });

      await action.execute();
    } catch (error) {
      // @ts-ignore
      expect(error.message).toBe('error on repository');
    }
  });
});

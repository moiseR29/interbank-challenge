import { Logger } from '@shared/core';
import {
  Amount,
  TransactionRepository,
  Transaction,
  TransactionError,
  ExecutedAt,
  DebitAccount,
  CreditAccount,
  ID,
} from '@transaction/core';
import { AccountNumber, AccountRepository } from '@account/core';

export interface ExecuteTransactionActionDependencies {
  logger: Logger;
  accountRepository: AccountRepository;
  transactionRepository: TransactionRepository;
}

export interface ExecuteTransactionActionPayload {
  amount: Amount;
  debitAccount: AccountNumber;
  creditAccount: AccountNumber;
}

export class ExecuteTransactionAction {
  constructor(private readonly dep: ExecuteTransactionActionDependencies) {}

  async execute(
    payload: ExecuteTransactionActionPayload,
  ): Promise<Transaction> {
    try {
      this.dep.logger.info('executing ExecuteTransactionAction');

      const {
        amount,
        creditAccount: creditAccountNumber,
        debitAccount: debitAccountNumber,
      } = payload;

      if (!amount.isPositive())
        throw new TransactionError('The amount must be greater than 0.');

      const debitAccount =
        await this.dep.accountRepository.getByAccountNumber(debitAccountNumber);

      if (!debitAccount) throw TransactionError.accountNotFound('DebitAccount');

      const creditAccount =
        await this.dep.accountRepository.getByAccountNumber(
          creditAccountNumber,
        );

      if (!creditAccount)
        throw TransactionError.accountNotFound('CreditAccount');

      debitAccount.amount.movement(-Number(amount.value));
      creditAccount.amount.movement(Number(amount.value));

      await this.dep.accountRepository.updateAmount(debitAccount);
      await this.dep.accountRepository.updateAmount(creditAccount);

      const transaction = new Transaction({ id: ID.new() });

      transaction
        .setExecutedAt(ExecutedAt.new())
        .setAmount(amount)
        .setDebit(new DebitAccount(debitAccount.accountNumber.value))
        .setCredit(new CreditAccount(creditAccount.accountNumber.value));

      await this.dep.transactionRepository.save(transaction);

      return transaction;
    } catch (error) {
      throw error;
    }
  }
}

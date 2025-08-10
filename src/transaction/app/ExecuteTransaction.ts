import { App, AppDependencies } from '@shared/app';
import { AccountNumber, AccountRepository } from '@account/core';
import {
  TransactionError,
  Transaction,
  ID,
  ExecutedAt,
  Amount,
  DebitAccount,
  CreditAccount,
  TransactionRepository,
} from '@transaction/core';

export interface ExecuteTransactionDependencies extends AppDependencies {
  accountRepository: AccountRepository;
  transactionRepository: TransactionRepository;
}

export interface ExecuteTransactionPayload {
  amount: Amount;
  debitAccount: AccountNumber;
  creditAccount: AccountNumber;
}

export class ExecuteTransaction extends App {
  private accountRepository: AccountRepository;
  private transactionRepository: TransactionRepository;

  constructor(dep: ExecuteTransactionDependencies) {
    super(dep);
    this.accountRepository = dep.accountRepository;
    this.transactionRepository = dep.transactionRepository;
  }

  async execute(payload: ExecuteTransactionPayload): Promise<Transaction> {
    try {
      const {
        amount,
        creditAccount: creditAccountNumber,
        debitAccount: debitAccountNumber,
      } = payload;

      if (!amount.isPositive())
        throw new TransactionError('The amount must be greater than 0.');

      const debitAccount =
        await this.accountRepository.getByAccountNumber(debitAccountNumber);

      if (!debitAccount) throw TransactionError.accountNotFound('DebitAccount');

      const creditAccount =
        await this.accountRepository.getByAccountNumber(creditAccountNumber);

      if (!creditAccount)
        throw TransactionError.accountNotFound('CreditAccount');

      debitAccount.amount.movement(-Number(amount.value));
      creditAccount.amount.movement(Number(amount.value));

      await this.accountRepository.updateAmount(debitAccount);
      await this.accountRepository.updateAmount(creditAccount);

      const tx = new Transaction({ id: ID.new() });

      tx.setExecutedAt(ExecutedAt.new())
        .setAmount(amount)
        .setDebit(new DebitAccount(debitAccount.accountNumber.value))
        .setCredit(new CreditAccount(creditAccount.accountNumber.value));

      await this.transactionRepository.save(tx);

      return tx;
    } catch (error) {
      throw error;
    }
  }
}

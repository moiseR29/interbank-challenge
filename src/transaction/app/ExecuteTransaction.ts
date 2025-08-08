import { App, AppDependencies } from '@shared/app';
import { AccountNumber, AccountRepository } from '@account/core';
import {
  TransactionError,
  Transaction,
  ID,
  State,
  ExecutedAt,
  Amount,
  DebitAccount,
  CreditAccount,
  TRANSACTION_STATE,
  TransactionRepository,
} from '@transaction/core';

export interface ExecuteTransactionDependencies extends AppDependencies {
  accountRepository: AccountRepository;
  transactionRepository: TransactionRepository;
}

export interface ExecuteTransaction {
  amount: number;
  debitAccount: string;
  creditAccount: string;
}

export class ExecuteTransaction extends App {
  private accountRepository: AccountRepository;
  private transactionRepository: TransactionRepository;

  constructor(dep: ExecuteTransactionDependencies) {
    super(dep);
    this.accountRepository = dep.accountRepository;
    this.transactionRepository = dep.transactionRepository;
  }

  async execute(payload: ExecuteTransaction): Promise<Transaction> {
    try {
      const { amount, creditAccount: from, debitAccount: to } = payload;
      const debitAccountNumber = new AccountNumber(from);
      const creditAccountNumber = new AccountNumber(to);

      const debitAccount = await this.accountRepository.getByAccountNumber(
        debitAccountNumber,
      );

      if (!debitAccount)
        throw new TransactionError('DebitAccount doesnt exist');

      const creditAccount = await this.accountRepository.getByAccountNumber(
        creditAccountNumber,
      );

      if (!creditAccount)
        throw new TransactionError('CreditAccount doesnt exist');

      debitAccount.amount.movement(-Number(amount));
      creditAccount.amount.movement(Number(amount));

      await this.accountRepository.updateAmount(debitAccount);
      await this.accountRepository.updateAmount(creditAccount);

      const tx = new Transaction({ id: ID.new() });

      tx.setState(new State(TRANSACTION_STATE.SUCCESS))
        .setExecutedAt(ExecutedAt.new())
        .setDebit(new DebitAccount(debitAccount.accountNumber.value))
        .setAmount(new Amount(amount))
        .setCredit(new CreditAccount(creditAccount.accountNumber.value));

      await this.transactionRepository.save(tx);

      return tx;
    } catch (error) {
      throw error;
    }
  }
}

import { MemoryDB } from '@infra/db/memory';
import { Logger } from '@shared/core';
import {
  Transaction,
  TransactionRepository,
  ID,
  DebitAccount,
  CreditAccount,
  ExecutedAt,
  Amount,
} from '@transaction/core';
import moment from 'moment-timezone';

export interface SchemeTransaction {
  id: string;
  amount: number;
  debit: string;
  credit: string;
  executedAt: string;
}

export interface TransactionMemoryRepositoryDependencies {
  logger: Logger;
  data: MemoryDB;
}

export class TransactionMemoryRepository implements TransactionRepository {
  private logger: Logger;
  private db: MemoryDB;

  constructor(dep: TransactionMemoryRepositoryDependencies) {
    this.logger = dep.logger;
    this.db = dep.data;
  }

  async save(tx: Transaction): Promise<Transaction> {
    this.db.transaction.push({
      id: tx.id.value,
      amount: tx.amount.value,
      credit: tx.credit.value,
      debit: tx.debit.value,
      executedAt: tx.executedAt.value.format(),
    });
    return tx;
  }

  async getBetweenDates(
    dateFrom: string,
    dateTo: string,
  ): Promise<Array<Transaction>> {
    const transactions = this.db.transaction.filter((v) => {
      const companyDate = moment.utc(v.executedAt);
      const from = moment.utc(dateFrom);
      const to = moment.utc(dateTo);

      return companyDate.isBetween(from, to);
    });

    return transactions.map((t) => {
      return new Transaction({
        id: new ID(t.id),
        amount: new Amount(t.amount),
        credit: new CreditAccount(t.credit),
        debit: new DebitAccount(t.debit),
        executedAt: ExecutedAt.newFromUTC(t.executedAt),
      });
    });
  }
}

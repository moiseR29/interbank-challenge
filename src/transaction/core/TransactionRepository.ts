import { Transaction } from './Transaction';

export interface TransactionRepository {
  save(tx: Transaction): Promise<Transaction>;
  getBetweenDates(
    dateFrom: string,
    dateTo: string,
  ): Promise<Array<Transaction>>;
}

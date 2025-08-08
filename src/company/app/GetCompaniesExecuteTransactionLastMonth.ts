import moment from 'moment-timezone';
import { Company, CompanyError, CompanyRepository } from '@company/core';
import { App, AppDependencies } from '@shared/app';
import { Transaction, TransactionRepository } from '@transaction/core';
import { AccountNumber } from '@account/core';

export interface GetCompaniesExecuteTransactionLastMonthDependencies
  extends AppDependencies {
  transactionRepository: TransactionRepository;
  companyRepository: CompanyRepository;
}

export interface GetCompaniesExecuteTransactionLastMonthResponse {
  company: Company;
  transactions: Array<Transaction>;
}

export class GetCompaniesExecuteTransactionLastMonth extends App {
  private transactionRepository: TransactionRepository;
  private companyRepository: CompanyRepository;

  constructor(dep: GetCompaniesExecuteTransactionLastMonthDependencies) {
    super(dep);
    this.transactionRepository = dep.transactionRepository;
    this.companyRepository = dep.companyRepository;
  }

  async execute(): Promise<
    Array<GetCompaniesExecuteTransactionLastMonthResponse>
  > {
    try {
      const currentDayLastMonth = moment().utc().subtract(1, 'M');
      const firstDayLastMonth = currentDayLastMonth
        .startOf('month')
        .format('YYYY-MM-DD');
      const lastDayLastMonth = currentDayLastMonth
        .endOf('month')
        .format('YYYY-MM-DD');

      const transactions = await this.transactionRepository.getBetweenDates(
        firstDayLastMonth,
        lastDayLastMonth,
      );

      const mapper = new Map<
        string,
        GetCompaniesExecuteTransactionLastMonthResponse
      >();

      for (let tx of transactions) {
        if (!mapper.has(tx.debit.value)) {
          const company =
            await this.companyRepository.getCompanyByAccountNumber(
              new AccountNumber(tx.debit.value),
            );
          if (!company)
            throw new CompanyError(`${tx.debit.value} doesnt has company`);

          mapper.set(tx.debit.value, { company, transactions: [] });
        }

        const res = mapper.get(tx.debit.value)!;

        res.transactions.push(tx);

        mapper.set(tx.debit.value, res);
      }

      return Array.from(mapper.values());
    } catch (error) {
      throw error;
    }
  }
}

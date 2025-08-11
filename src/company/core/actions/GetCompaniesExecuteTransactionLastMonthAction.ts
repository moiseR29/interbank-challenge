import moment from 'moment-timezone';
import { Logger } from '@shared/core';
import { Transaction, TransactionRepository } from '@transaction/core';
import { Company, CompanyError, CompanyRepository } from '@company/core';
import { AccountNumber } from '@account/core';

export class GetCompaniesExecuteTransactionLastMonthActionDependencies {
  logger: Logger;
  transactionRepository: TransactionRepository;
  companyRepository: CompanyRepository;
}

export interface GetCompaniesExecuteTransactionLastMonthActionResponse {
  company: Company;
  transactions: Array<Transaction>;
}

export class GetCompaniesExecuteTransactionLastMonthAction {
  constructor(
    private dep: GetCompaniesExecuteTransactionLastMonthActionDependencies,
  ) {}

  async execute(): Promise<
    Array<GetCompaniesExecuteTransactionLastMonthActionResponse>
  > {
    this.dep.logger.info(
      'Executing GetCompaniesExecuteTransactionLastMonthAction',
    );
    try {
      this.dep.logger.info('calculating dates');
      const currentDayLastMonth = moment().utc().subtract(1, 'M');
      const firstDayLastMonth = currentDayLastMonth
        .startOf('month')
        .format('YYYY-MM-DD');
      const lastDayLastMonth = currentDayLastMonth
        .endOf('month')
        .format('YYYY-MM-DD');

      this.dep.logger.info(
        'searching transaction between days in the repository',
      );
      const transactions = await this.dep.transactionRepository.getBetweenDates(
        firstDayLastMonth,
        lastDayLastMonth,
      );

      this.dep.logger.info('mapping results');
      const mapper = new Map<
        string,
        GetCompaniesExecuteTransactionLastMonthActionResponse
      >();

      for (let tx of transactions) {
        if (!mapper.has(tx.debit.value)) {
          const company =
            await this.dep.companyRepository.getCompanyByAccountNumber(
              new AccountNumber(tx.debit.value),
            );
          if (!company)
            throw CompanyError.accountDoesnotHaveCompany(tx.debit.value);

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

import moment from 'moment-timezone';
import { Logger } from '@shared/core';
import { CompanyRepository, Company } from '@company/core';

export interface GetCompaniesJoinedLastMonthActionDependencies {
  logger: Logger;
  companyRepository: CompanyRepository;
}

export class GetCompaniesJoinedLastMonthAction {
  constructor(
    private readonly dep: GetCompaniesJoinedLastMonthActionDependencies,
  ) {}

  async execute(): Promise<Array<Company>> {
    this.dep.logger.info('Executing GetCompaniesJoinedLastMonthAction');
    try {
      this.dep.logger.info('calculating dates');
      const currentDayLastMonth = moment().utc().subtract(1, 'M');
      const firstDayLastMonth = currentDayLastMonth
        .startOf('month')
        .format('YYYY-MM-DD');
      const lastDayLastMonth = currentDayLastMonth
        .endOf('month')
        .format('YYYY-MM-DD');

      this.dep.logger.info('searching companies');
      const companies =
        await this.dep.companyRepository.getCompaniesBetweenDates(
          firstDayLastMonth,
          lastDayLastMonth,
        );

      return companies;
    } catch (error) {
      throw error;
    }
  }
}

import moment from 'moment-timezone';
import { Company, CompanyRepository } from '@company/core';
import { App, AppDependencies } from '@shared/app';

export interface GetCompaniesJoinedLastMonthDependencies
  extends AppDependencies {
  companyRepository: CompanyRepository;
}

export class GetCompaniesJoinedLastMonth extends App {
  private repository: CompanyRepository;

  constructor(dep: GetCompaniesJoinedLastMonthDependencies) {
    super(dep);
    this.repository = dep.companyRepository;
  }

  async execute(): Promise<Array<Company>> {
    this.logger.info('Executing ... GetCampaingJoinedLastMonth');
    try {
      this.logger.info('calculating dates');
      const currentDayLastMonth = moment().utc().subtract(1, 'M');
      const firstDayLastMonth = currentDayLastMonth
        .startOf('month')
        .format('YYYY-MM-DD');
      const lastDayLastMonth = currentDayLastMonth
        .endOf('month')
        .format('YYYY-MM-DD');

      this.logger.info('searching companies');
      const companies = await this.repository.getCompaniesBetweenDates(
        firstDayLastMonth,
        lastDayLastMonth,
      );

      return companies;
    } catch (error) {
      throw error;
    }
  }
}

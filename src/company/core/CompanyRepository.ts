import { AccountNumber } from '@account/core';
import { Company } from './Company';

export interface CompanyRepository {
  save(company: Company): Promise<Company>;
  getCompaniesBetweenDates(
    dateFrom: string,
    dateTo: string,
  ): Promise<Array<Company>>;
  getCompanyByAccountNumber(
    accountNumber: AccountNumber,
  ): Promise<Company | undefined>;
}

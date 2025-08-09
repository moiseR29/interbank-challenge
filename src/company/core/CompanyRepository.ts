import { AccountNumber } from '@account/core';
import { Company } from './Company';
import { CUIT } from './params';

export interface CompanyRepository {
  save(company: Company): Promise<Company>;
  verifyExistsCompanyByCuit(cuit: CUIT): Promise<boolean>;
  getCompaniesBetweenDates(
    dateFrom: string,
    dateTo: string,
  ): Promise<Array<Company>>;
  getCompanyByAccountNumber(
    accountNumber: AccountNumber,
  ): Promise<Company | undefined>;
}

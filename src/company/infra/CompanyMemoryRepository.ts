import { AccountNumber } from '@account/core';
import {
  Company,
  CompanyError,
  CompanyRepository,
  CreatedAt,
  CUIT,
  ID,
  Name,
  Type,
} from '@company/core';
import { MemoryDB } from '@infra/db/memory';
import { Logger } from '@shared/core';
import moment from 'moment-timezone';

export interface CompanyMemoryRepositoryDependencies {
  logger: Logger;
  data: MemoryDB;
}

export interface SchemeCompany {
  id: string;
  createdAt: string;
  cuit: string;
  name: string;
  type: string;
  account: string;
}

export class CompanyMemoryRepository implements CompanyRepository {
  private logger: Logger;
  private db: MemoryDB;

  constructor(dep: CompanyMemoryRepositoryDependencies) {
    this.logger = dep.logger;
    this.db = dep.data;
  }

  async save(company: Company): Promise<Company> {
    if (this.db.company.has(company.id.value)) {
      this.logger.error('Company Already exist on database');
      throw CompanyError.repository('Company Already exist on database');
    }

    this.db.company.set(company.id.value, {
      id: company.id.value,
      createdAt: company.createdAt.value.format(),
      cuit: company.cuit.value,
      name: company.name.value,
      type: company.type.value,
      account: company.account.accountNumber.value,
    });
    return company;
  }

  async verifyExistsCompanyByCuit(cuit: CUIT): Promise<boolean> {
    const v = Array.from(this.db.company.values());

    const company = v.filter((v) => v.cuit === cuit.value);

    return !!company.length;
  }

  async getCompaniesBetweenDates(
    dateFrom: string,
    dateTo: string,
  ): Promise<Array<Company>> {
    const v = Array.from(this.db.company.values());

    const companies = v.filter((v) => {
      const companyDate = moment.utc(v.createdAt);
      const from = moment.utc(dateFrom);
      const to = moment.utc(dateTo);

      return companyDate.isBetween(from, to);
    });

    return companies.map((c) => {
      return new Company({
        id: new ID(c.id),
        createdAt: CreatedAt.newFromUTC(c.createdAt),
        cuit: new CUIT(c.cuit),
        name: new Name(c.name),
        type: new Type(c.type),
      });
    });
  }

  async getCompanyByAccountNumber(
    accountNumber: AccountNumber,
  ): Promise<Company | undefined> {
    const v = Array.from(this.db.company.values());

    const company = v.filter((v) => v.account === accountNumber.value);

    if (!company.length) return undefined;

    const companyMap = this.db.company.get(company[0].id)!;

    return new Company({
      id: new ID(companyMap.id),
      createdAt: CreatedAt.newFromUTC(companyMap.createdAt),
      cuit: new CUIT(companyMap.cuit),
      name: new Name(companyMap.name),
      type: new Type(companyMap.type),
    });
  }
}

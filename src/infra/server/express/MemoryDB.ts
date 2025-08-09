import { SchemeAccount } from '@account/infra';
import { COMPANY_TYPES } from '@company/core';
import { SchemeCompany } from '@company/infra/CompanyMemoryRepository';
import moment from 'moment-timezone';

export class MemoryDB {
  private static _instance: MemoryDB;

  private accountDb: Map<string, SchemeAccount>;
  private companyDb: Map<string, SchemeCompany>;

  constructor() {
    this.accountDb = new Map<string, SchemeAccount>();
    this.companyDb = new Map<string, SchemeCompany>();
    this.fillAccounts();
    this.fillCompanies();
  }

  private fillCompanies() {
    console.log('Charging Companies in memory');
    this.companyDb.set('71a9e4bf-0e2c-476f-9ed3-f080cfa8758c', {
      createdAt: moment().utc().subtract(3, 'M').format(),
      cuit: '30-29593023-2',
      id: '71a9e4bf-0e2c-476f-9ed3-f080cfa8758c',
      name: 'Company 1',
      type: COMPANY_TYPES.PYME,
      account: 'USD-78237/01',
    });

    this.companyDb.set('0d88243e-8520-4209-92df-277e1003a2fa', {
      createdAt: moment().utc().subtract(1, 'M').format(),
      cuit: '40-79293921-8',
      id: '0d88243e-8520-4209-92df-277e1003a2fa',
      name: 'Company 2',
      type: COMPANY_TYPES.CORPORATIVE,
      account: 'USD-49249/02',
    });

    this.companyDb.set('a3efaabd-7d68-45ff-8e1b-e69547af8a57', {
      createdAt: moment().utc().subtract(1, 'M').format(),
      cuit: '72-89191123-3',
      id: 'a3efaabd-7d68-45ff-8e1b-e69547af8a57',
      name: 'Company 3 S.A.',
      type: COMPANY_TYPES.CORPORATIVE,
      account: 'USD-20213/08',
    });

    this.companyDb.set('9b357dc1-cc2a-489a-9b34-c7cd69895d1c', {
      createdAt: moment().utc().subtract(2, 'M').format(),
      cuit: '99-22197723-8',
      id: '9b357dc1-cc2a-489a-9b34-c7cd69895d1c',
      name: 'Company 4',
      type: COMPANY_TYPES.PYME,
      account: 'USD-77291/09',
    });

    this.companyDb.set('4fbbd086-61a4-4e21-8177-04d4c0ed5a05', {
      createdAt: moment().utc().subtract(2, 'M').format(),
      cuit: '77-51107823-2',
      id: '4fbbd086-61a4-4e21-8177-04d4c0ed5a05',
      name: 'Company 5 S.A.',
      type: COMPANY_TYPES.PYME,
      account: 'USD-98273/07',
    });
  }

  private fillAccounts() {
    console.log('Charging Accounts in memory');
    this.accountDb.set('USD-78237/01', {
      amount: 1000,
      createdAt: moment().utc().subtract(3, 'M').format(),
      id: 'USD-78237/01',
    });

    this.accountDb.set('USD-49249/02', {
      amount: 0,
      createdAt: moment().utc().subtract(1, 'M').format(),
      id: 'USD-49249/02',
    });

    this.accountDb.set('USD-20213/08', {
      amount: 8000,
      createdAt: moment().utc().subtract(1, 'M').format(),
      id: 'USD-20213/08',
    });

    this.accountDb.set('USD-77291/09', {
      amount: -900,
      createdAt: moment().utc().subtract(2, 'M').format(),
      id: 'USD-77291/09',
    });

    this.accountDb.set('USD-98273/07', {
      amount: 0,
      createdAt: moment().utc().subtract(2, 'M').format(),
      id: 'USD-98273/07',
    });
  }

  static getInstance(): MemoryDB {
    if (this._instance) {
      return this._instance;
    }

    this._instance = new MemoryDB();
    return this._instance;
  }

  get account(): Map<string, SchemeAccount> {
    return this.accountDb;
  }

  get company(): Map<string, SchemeCompany> {
    return this.companyDb;
  }
}

import { v4 } from 'uuid';
import { SchemeAccount } from '@account/infra';
import { COMPANY_TYPES } from '@company/core';
import { SchemeCompany } from '@company/infra/CompanyMemoryRepository';
import { SchemeTransaction } from '@transaction/infra/TransactionMemoryRepository';

export class MemoryDB {
  private static _instance: MemoryDB;

  private accountDb: Map<string, SchemeAccount>;
  private companyDb: Map<string, SchemeCompany>;
  private transactionDb: Array<SchemeTransaction>;

  constructor() {
    this.accountDb = new Map<string, SchemeAccount>();
    this.companyDb = new Map<string, SchemeCompany>();
    this.transactionDb = [];
    this.fillAccounts();
    this.fillCompanies();
    this.fillTransaction();
  }

  private fillCompanies() {
    console.log('Charging Companies in memory');
    this.companyDb.set('71a9e4bf-0e2c-476f-9ed3-f080cfa8758c', {
      createdAt: '2025-05-01T20:16:57Z',
      cuit: '30-29593023-2',
      id: '71a9e4bf-0e2c-476f-9ed3-f080cfa8758c',
      name: 'Company 1',
      type: COMPANY_TYPES.PYME,
      account: 'USD-78237/01',
    });

    this.companyDb.set('0d88243e-8520-4209-92df-277e1003a2fa', {
      createdAt: '2025-07-22T19:00:27Z',
      cuit: '40-79293921-8',
      id: '0d88243e-8520-4209-92df-277e1003a2fa',
      name: 'Company 2',
      type: COMPANY_TYPES.CORPORATIVE,
      account: 'USD-49249/02',
    });

    this.companyDb.set('a3efaabd-7d68-45ff-8e1b-e69547af8a57', {
      createdAt: '2025-07-11T01:53:33Z',
      cuit: '72-89191123-3',
      id: 'a3efaabd-7d68-45ff-8e1b-e69547af8a57',
      name: 'Company 3 S.A.',
      type: COMPANY_TYPES.CORPORATIVE,
      account: 'USD-20213/08',
    });

    this.companyDb.set('9b357dc1-cc2a-489a-9b34-c7cd69895d1c', {
      createdAt: '2025-07-02T21:22:38Z',
      cuit: '99-22197723-8',
      id: '9b357dc1-cc2a-489a-9b34-c7cd69895d1c',
      name: 'Company 4',
      type: COMPANY_TYPES.PYME,
      account: 'USD-77291/09',
    });

    this.companyDb.set('4fbbd086-61a4-4e21-8177-04d4c0ed5a05', {
      createdAt: '2025-05-11T04:12:32Z',
      cuit: '77-51107823-2',
      id: '4fbbd086-61a4-4e21-8177-04d4c0ed5a05',
      name: 'Company 5 S.A.',
      type: COMPANY_TYPES.PYME,
      account: 'USD-82934/01',
    });

    this.companyDb.set('3c601144-478b-4460-a817-e9a608d12e6c', {
      createdAt: '2025-02-23T19:22:52Z',
      cuit: '77-51107823-2',
      id: '3c601144-478b-4460-a817-e9a608d12e6c',
      name: 'Company 6 S.A.',
      type: COMPANY_TYPES.PYME,
      account: 'USD-98273/07',
    });

    this.companyDb.set('a3251447-059e-4baf-a8eb-04cefba4a224', {
      createdAt: '2025-07-14T22:22:22Z',
      cuit: '99-22197723-8',
      id: 'a3251447-059e-4baf-a8eb-04cefba4a224',
      name: 'Company 7',
      type: COMPANY_TYPES.PYME,
      account: 'USD-84923/02',
    });
    console.log(`${this.companyDb.size} companies were charged`);
  }

  private fillAccounts() {
    console.log('Charging Accounts in memory');
    this.accountDb.set('USD-78237/01', {
      amount: 2300,
      createdAt: '2025-05-01T20:17:57Z',
      id: 'USD-78237/01',
    });

    this.accountDb.set('USD-49249/02', {
      amount: 12400,
      createdAt: '2025-07-22T19:01:27Z',
      id: 'USD-49249/02',
    });

    this.accountDb.set('USD-20213/08', {
      amount: -900,
      createdAt: '2025-07-11T01:54:33Z',
      id: 'USD-20213/08',
    });

    this.accountDb.set('USD-77291/09', {
      amount: 270,
      createdAt: '2025-07-02T21:23:38Z',
      id: 'USD-77291/09',
    });

    this.accountDb.set('USD-82934/01', {
      amount: 1530,
      createdAt: '2025-05-11T04:13:32Z',
      id: 'USD-82934/01',
    });

    this.accountDb.set('USD-98273/07', {
      amount: -800,
      createdAt: '2025-02-23T19:23:52Z',
      id: 'USD-98273/07',
    });

    this.accountDb.set('USD-84923/02', {
      amount: 1200,
      createdAt: '2025-07-14T22:23:22Z',
      id: 'USD-84923/02',
    });
    console.log(`${this.accountDb.size} accounts were charged`);
  }

  private fillTransaction() {
    console.log('Charging transactions in memory');
    this.transactionDb = [
      {
        id: '622916e7-4156-44f9-af6f-6c604ba922bf',
        amount: 15000,
        debit: 'USD-78237/01',
        credit: 'USD-49249/02',
        executedAt: '2025-07-29T20:20:57Z',
      },
      {
        id: '35f2ed52-9c39-4276-a14d-31e83f165dc8',
        amount: 7000,
        debit: 'USD-49249/02',
        credit: 'USD-20213/08',
        executedAt: '2025-07-29T20:20:57Z',
      },
      {
        id: '3bf3f886-4265-462c-8690-c405ed3522cb',
        amount: 3500,
        debit: 'USD-20213/08',
        credit: 'USD-77291/09',
        executedAt: '2025-07-29T20:20:57Z',
      },
      {
        id: 'ddcf276b-7667-4185-b906-1b27333bebfb',
        amount: 3230,
        debit: 'USD-77291/09',
        credit: 'USD-82934/01',
        executedAt: '2025-07-29T20:20:57Z',
      },
      {
        id: 'cd2a3200-1fda-490e-8d81-d8b0c0b6546d',
        amount: 1700,
        debit: 'USD-82934/01',
        credit: 'USD-98273/07',
        executedAt: '2025-07-29T20:20:57Z',
      },
      {
        id: '140cf3ef-2526-4fcf-8092-7e0375b0dd23',
        amount: 2200,
        debit: 'USD-98273/07',
        credit: 'USD-84923/02',
        executedAt: '2025-07-29T20:20:57Z',
      },
      {
        id: 'e2beb4ce-13a4-40b8-903c-e4fb4b072d15',
        amount: 300,
        debit: 'USD-84923/02',
        credit: 'USD-78237/01',
        executedAt: '2025-07-30T20:20:57Z',
      },
      {
        id: 'f998c5fb-6477-443a-a3fe-29deee8db0d0',
        amount: 4400,
        debit: 'USD-20213/08',
        credit: 'USD-49249/02',
        executedAt: '2025-07-30T20:20:57Z',
      },
      {
        id: 'e5c4b4bd-a330-4435-b00f-2cd2695b92db',
        amount: 1000,
        debit: 'USD-77291/09',
        credit: 'USD-78237/01',
        executedAt: '2025-07-30T20:20:57Z',
      },
    ];
    console.log(`${this.transactionDb.length + 1} accounts were charged`);
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

  get transaction(): Array<SchemeTransaction> {
    return this.transactionDb;
  }
}

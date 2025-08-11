import { Request, Response } from 'express';
import {
  CreateCompanyApplication,
  CreateCompanyApplicationDependencies,
  CreateCompanyApplicationPayload,
  GetCompaniesExecuteTransactionLastMonthApplication,
  GetCompaniesExecuteTransactionLastMonthApplicationDependencies,
  GetCompaniesJoinedLastMonthApplication,
  GetCompaniesJoinedLastMonthApplicationDependencies,
} from '@company/app';
import { MemoryDB } from '@infra/db/memory';
import { WinstonLogger } from '@infra/libraries/winston';
import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { CompanyMemoryRepository } from '../CompanyMemoryRepository';
import { TransactionMemoryRepository } from '@transaction/infra';
import { AccountMemoryRepository } from '@account/infra';
import { CompanyError, CUIT, Name, Type } from '@company/core';
import { CreateCompanyExpressEndpointPayload } from '../express/CreateCompanyExpressEndpoint';

@Controller()
export class CompanyController {
  @Post('/company')
  async createCompany(@Req() req: Request) {
    const logger = new WinstonLogger('-> Create Company');
    const db = MemoryDB.getInstance();

    const body = req.body as CreateCompanyExpressEndpointPayload;
    if (!body.name) throw new CompanyError('name is required');
    if (!body.cuit) throw new CompanyError('cuit is required');
    if (!body.type) throw new CompanyError('type is required');

    const payload: CreateCompanyApplicationPayload = {
      name: new Name(body.name),
      cuit: new CUIT(body.cuit),
      type: new Type(body.type),
    };

    const deps: CreateCompanyApplicationDependencies = {
      logger,
      accountRepository: new AccountMemoryRepository({ logger, data: db }),
      companyRepository: new CompanyMemoryRepository({ logger, data: db }),
    };
    const uCase = new CreateCompanyApplication(deps);

    const caseResponse = await uCase.execute(payload);

    return {
      id: caseResponse.id.value,
      account: caseResponse.account.accountNumber.value,
      createdAt: caseResponse.createdAt.value.format(),
    };
  }

  @Get('/company')
  async getCompaniesJoinedLastMonth() {
    const logger = new WinstonLogger('-> Get Companies joined last month');

    const db = MemoryDB.getInstance();
    const deps: GetCompaniesJoinedLastMonthApplicationDependencies = {
      logger,
      companyRepository: new CompanyMemoryRepository({ logger, data: db }),
    };

    const uCase = new GetCompaniesJoinedLastMonthApplication(deps);

    const companies = await uCase.execute();

    const companiesResponse = companies.map((c) => ({
      cuit: c.cuit.value,
      createdAt: c.createdAt.value.format(),
      type: c.type.value,
      name: c.name.value,
    }));

    return companiesResponse;
  }

  @Get('/company/transactions')
  async getCompaniesExecuteTransactionLastMonth() {
    const logger = new WinstonLogger(
      '-> Get Companies executed transaction last month',
    );
    const db = MemoryDB.getInstance();
    const deps: GetCompaniesExecuteTransactionLastMonthApplicationDependencies =
      {
        logger,
        companyRepository: new CompanyMemoryRepository({ logger, data: db }),
        transactionRepository: new TransactionMemoryRepository({
          logger,
          data: db,
        }),
      };

    const uCase = new GetCompaniesExecuteTransactionLastMonthApplication(deps);
    const caseResponse = await uCase.execute();

    const response = caseResponse.map((cr) => {
      return {
        cuit: cr.company.cuit.value,
        createdAt: cr.company.createdAt.value.format(),
        type: cr.company.type.value,
        name: cr.company.name.value,
        transactions: cr.transactions.map((tr) => ({
          amount: tr.amount.value,
          debit: tr.debit.value,
          credit: tr.credit.value,
          executedAt: tr.executedAt.value,
        })),
      };
    });

    return response;
  }
}

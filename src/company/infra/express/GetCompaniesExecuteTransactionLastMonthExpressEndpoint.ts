import { CompanyError } from '@company/core';
import { MemoryDB } from '@infra/db/memory';
import { WinstonLogger } from '@infra/libraries/winston';
import { Request, Response, NextFunction } from 'express';
import {
  GetCompaniesExecuteTransactionLastMonthApplication,
  GetCompaniesExecuteTransactionLastMonthApplicationDependencies,
} from '@company/app';
import { CompanyMemoryRepository } from '../CompanyMemoryRepository';
import { TransactionMemoryRepository } from '@transaction/infra';

export interface GetCompaniesExecuteTransactionLastMonthExpressEndpointResponse {
  cuit: string;
  createdAt: string;
  type: string;
  name: string;
  transaction: Array<{
    amount: number;
    debit: string;
    credit: string;
    executedAt: string;
  }>;
}

export const GetCompaniesExecuteTransactionLastMonthExpressEndpoint = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const logger = new WinstonLogger(
    '-> Get Companies executed transaction last month',
  );

  try {
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

    return res.status(200).send(response);
  } catch (error) {
    next(error);
  }
};

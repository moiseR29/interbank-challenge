import { Request, Response, NextFunction } from 'express';
import { MemoryDB } from '@infra/db/memory';
import { WinstonLogger } from '@infra/libraries/winston';
import { Amount } from '@transaction/core';
import {
  ExecuteTransaction,
  ExecuteTransactionDependencies,
} from '@transaction/app';
import { TransactionMemoryRepository } from '../TransactionMemoryRepository';
import { AccountMemoryRepository } from '@account/infra';
import { AccountNumber } from '@account/core';

export interface ExecuteTransactionExpressEndpointResponse {
  amount: number;
  debit: string;
  credit: string;
  executedAt: string;
}

export interface ExecuteTransactionExpressEndpointPayload {
  amount: number;
  debit: string;
  credit: string;
}

export const ExecuteTransactionExpressEndpoint = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const logger = new WinstonLogger('-> Execute transaction');

  try {
    const db = MemoryDB.getInstance();

    const deps: ExecuteTransactionDependencies = {
      logger,
      transactionRepository: new TransactionMemoryRepository({
        logger,
        data: db,
      }),
      accountRepository: new AccountMemoryRepository({
        logger,
        data: db,
      }),
    };

    const payload = req.body as ExecuteTransactionExpressEndpointPayload;

    const uCase = new ExecuteTransaction(deps);

    const caseResponse = await uCase.execute({
      amount: new Amount(payload.amount),
      creditAccount: new AccountNumber(payload.credit),
      debitAccount: new AccountNumber(payload.debit),
    });

    return res.status(200).send({
      amout: caseResponse.amount.value,
      debit: caseResponse.debit.value,
      credit: caseResponse.credit.value,
      executedAt: caseResponse.executedAt.value.format(),
    });
  } catch (error) {
    next(error);
  }
};

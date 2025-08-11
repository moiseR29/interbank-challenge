import { Request } from 'express';
import { Controller, Post, Req } from '@nestjs/common';
import { WinstonLogger } from '@infra/libraries/winston';
import { MemoryDB } from '@infra/db/memory';
import { ExecuteTransactionExpressEndpointPayload } from '../express/ExecuteTransactionExpressEndpoint';
import {
  ExecuteTransactionApplication,
  ExecuteTransactionApplicationDependencies,
  ExecuteTransactionApplicationPayload,
} from '@transaction/app';
import { Amount } from '@transaction/core';
import { AccountNumber } from '@account/core';
import { TransactionMemoryRepository } from '../TransactionMemoryRepository';
import { AccountMemoryRepository } from '@account/infra';

@Controller()
export class TransactionController {
  @Post('/transaction')
  async executeTransaction(@Req() req: Request) {
    const logger = new WinstonLogger('-> Execute transaction');
    const db = MemoryDB.getInstance();

    const payload = req.body as ExecuteTransactionExpressEndpointPayload;

    const applicationPayload: ExecuteTransactionApplicationPayload = {
      amount: new Amount(payload.amount),
      creditAccount: new AccountNumber(payload.credit),
      debitAccount: new AccountNumber(payload.debit),
    };

    const deps: ExecuteTransactionApplicationDependencies = {
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

    const uCase = new ExecuteTransactionApplication(deps);

    const caseResponse = await uCase.execute(applicationPayload);

    return {
      amout: caseResponse.amount.value,
      debit: caseResponse.debit.value,
      credit: caseResponse.credit.value,
      executedAt: caseResponse.executedAt.value.format(),
    };
  }
}

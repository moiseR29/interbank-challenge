import { NextFunction, Request, Response } from 'express';
import { CreateCompany, CreateCompanyDependencies } from '@company/app';

import { AccountMemoryRepository } from '@account/infra';

import { WinstonLogger } from '@infra/libraries/winston';
import { MemoryDB } from '@infra/server/express/MemoryDB';
import { CompanyMemoryRepository } from '../CompanyMemoryRepository';
import { CompanyError, CUIT, Name, Type } from '@company/core';

export interface CreateCompanyExpressEndpointPayload {
  cuit: string;
  name: string;
  type: string;
}

export interface CreateCompanyExpressEndpointResponse {
  id: string;
  createdAt: string;
  account: string;
}

export const CreateCompanyExpressEndpoint = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const logger = new WinstonLogger('-> Create Company');
    const db = MemoryDB.getInstance();
    const deps: CreateCompanyDependencies = {
      logger,
      accountRepository: new AccountMemoryRepository({ logger, data: db }),
      companyRepository: new CompanyMemoryRepository({ logger, data: db }),
    };
    const uCase = new CreateCompany(deps);

    const body = req.body as CreateCompanyExpressEndpointPayload;

    if (!body.name) throw new CompanyError('name is required');
    if (!body.cuit) throw new CompanyError('cuit is required');
    if (!body.type) throw new CompanyError('type is required');

    const caseResponse = await uCase.execute({
      name: new Name(body.name),
      cuit: new CUIT(body.cuit),
      type: new Type(body.type),
    });

    return res.status(201).send({
      id: caseResponse.id.value,
      account: caseResponse.account.accountNumber.value,
      createdAt: caseResponse.createdAt.value.format(),
    });
  } catch (error) {
    return next(error);
  }
};

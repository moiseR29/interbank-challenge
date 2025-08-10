import { Request, Response, NextFunction } from 'express';
import { CompanyError } from '@company/core';
import { WinstonLogger } from '@infra/libraries/winston';
import {
  GetCompaniesJoinedLastMonth,
  GetCompaniesJoinedLastMonthDependencies,
} from '@company/app';
import { MemoryDB } from '@infra/db/memory';
import { CompanyMemoryRepository } from '../CompanyMemoryRepository';

export interface GetCompaniesJoinedLastMonthExpressEndpointResponse {
  cuit: string;
  createdAt: string;
  type: string;
  name: string;
}

export const GetCompaniesJoinedLastMonthExpressEndpoint = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const logger = new WinstonLogger('-> Get Companies joined last month');

  try {
    const db = MemoryDB.getInstance();
    const deps: GetCompaniesJoinedLastMonthDependencies = {
      logger,
      companyRepository: new CompanyMemoryRepository({ logger, data: db }),
    };

    const uCase = new GetCompaniesJoinedLastMonth(deps);

    const companies = await uCase.execute();

    const companiesResponse = companies.map((c) => ({
      cuit: c.cuit.value,
      createdAt: c.createdAt.value.format(),
      type: c.type.value,
      name: c.name.value,
    }));

    return res.status(200).send(companiesResponse);
  } catch (error) {
    const err = CompanyError.check(error).getError();
    logger.error(err.message);
    return res.status(err.statusCode).send(err);
  }
};

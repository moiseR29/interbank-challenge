import { Router } from 'express';

import { CreateCompanyExpressEndpoint } from './CreateCompanyExpressEndpoint';
import { GetCompaniesJoinedLastMonthExpressEndpoint } from './GetCompaniesJoinedLastMonthExpressEndpoint';
import { GetCompaniesExecuteTransactionLastMonthExpressEndpoint } from './GetCompaniesExecuteTransactionLastMonthExpressEndpoint';

const companyRouter = Router();

companyRouter.post('/company', CreateCompanyExpressEndpoint);
// TODO: this is endpoint, should be take more filters, but the challenge take only companies joined on last month
companyRouter.get('/company', GetCompaniesJoinedLastMonthExpressEndpoint);
// TODO: same situation
companyRouter.get(
  '/company/transactions',
  GetCompaniesExecuteTransactionLastMonthExpressEndpoint,
);

export { companyRouter };

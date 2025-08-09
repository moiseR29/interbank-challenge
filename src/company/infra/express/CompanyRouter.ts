import { Router } from 'express';

import { CreateCompanyExpressEndpoint } from './CreateCompanyExpressEndpoint';
import { GetCompaniesJoinedLastMonthExpressEndpoint } from './GetCompaniesJoinedLastMonthExpressEndpoint';

const companyRouter = Router();

companyRouter.post('/company', CreateCompanyExpressEndpoint);
// TODO: this is endpoint, should be take more filters, but the challenge take only companies joined on last month
companyRouter.get('/company', GetCompaniesJoinedLastMonthExpressEndpoint);

export { companyRouter };

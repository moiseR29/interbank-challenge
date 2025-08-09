import { Router } from 'express';

import { CreateCompanyExpressEndpoint } from './CreateCompanyExpressEndpoint';

const companyRouter = Router();

companyRouter.post('/company', CreateCompanyExpressEndpoint);

export { companyRouter };

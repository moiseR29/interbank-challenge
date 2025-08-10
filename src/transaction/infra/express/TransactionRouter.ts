import { Router } from 'express';

import { ExecuteTransactionExpressEndpoint } from './ExecuteTransactionExpressEndpoint';

const transactionRouter = Router();

transactionRouter.post('/transaction', ExecuteTransactionExpressEndpoint);

export { transactionRouter };

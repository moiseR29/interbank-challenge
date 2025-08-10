import { Request, Response, NextFunction } from 'express';

export const lambdaConversion = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // TODO:  this validation is for challenge, only I valid a method if equal to 'GET', this should validate req.body directly or use serverless plugin
  if (Buffer.isBuffer(req.body) && req.method !== 'GET')
    req.body = JSON.parse((req.body as Buffer).toString('utf-8'));

  next();
};

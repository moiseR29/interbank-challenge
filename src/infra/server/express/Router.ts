import { Router as ExRouter, Request, Response, NextFunction } from 'express';
import { companyRouter } from '@company/infra/express';
import { transactionRouter } from '@transaction/infra/express';

const handlerRouteNotFounded = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  return res.sendStatus(404);
};

export class ExpressRouter {
  private _router: ExRouter;

  constructor() {
    this._router = ExRouter();
    this.config();
  }

  private config() {
    this.addHealtyEndoint();
    this.applyEndpoint();
    this.notExistsEndpoint();
  }

  private addHealtyEndoint(): void {
    this._router.get(
      '/',
      (_req: Request, res: Response, _next: NextFunction) => {
        return res.status(200).send('Welcome to Interbank Challenge API');
      },
    );
  }

  private applyEndpoint(): void {
    this._router.use([companyRouter, transactionRouter]);
  }

  private notExistsEndpoint(): void {
    this._router.use('/{*any}', handlerRouteNotFounded);
  }

  private get router(): ExRouter {
    return this._router;
  }

  static new(): ExRouter {
    return new ExpressRouter().router;
  }
}

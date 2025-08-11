import helmet from 'helmet';
import cors from 'cors';
import express, {
  json,
  urlencoded,
  Request,
  Response,
  NextFunction,
  Application,
  Router,
} from 'express';
import { MainError } from '@shared/core';

const handlerError = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(error);
  const err = MainError.check(error).getError();
  return res.status(err.statusCode).send(err);
};

export class ExpressServer {
  private app: Application;

  constructor(router: Router) {
    this.app = express();
    this.config(router);
  }

  private config(router: Router) {
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));

    this.app.use(router);
    this.app.use(handlerError);
  }

  get server(): Application {
    return this.app;
  }

  static new(router: Router): ExpressServer {
    return new ExpressServer(router);
  }
}

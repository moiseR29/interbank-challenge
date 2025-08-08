import express, {
  json,
  urlencoded,
  Request,
  Response,
  NextFunction,
  Application,
  Router,
} from 'express';

const handlerError = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(error.stack);
  return res.status(500).send({ message: error.message });
};

export class ExpressServer {
  private app: Application;

  constructor(router: Router) {
    this.app = express();
    this.config(router);
  }

  private config(router: Router) {
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

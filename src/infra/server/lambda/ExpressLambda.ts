import 'module-alias/register';
import serverless from 'serverless-http';
import { ExpressServer } from '../express/Express';
import { ExpressRouter } from '../express/Router';
import { MemoryDB } from '@infra/db/memory';

// configure DB
MemoryDB.getInstance();

const server = () => {
  const server = ExpressServer.new(ExpressRouter.new()).server;

  /*   // configure DB
  MemoryDB.getInstance(); */

  return server;
};

export const handlerExpressLambda = serverless(server());

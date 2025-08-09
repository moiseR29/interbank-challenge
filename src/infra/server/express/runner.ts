import { ExpressServer } from './Express';
import { MemoryDB } from '../../db/memory';
import { ExpressRouter } from './Router';

export const expressRunner = () => {
  const port = 4000;
  const server = ExpressServer.new(ExpressRouter.new()).server;

  // configure DB
  MemoryDB.getInstance();

  server.listen(port, () => console.log(`Server running`));
};

import { ExpressServer } from './Express';
import { MemoryDB } from '../../db/memory';
import { ExpressRouter } from './Router';
import { ConfigManager } from '@infra/libraries/config';

export const expressRunner = () => {
  const port = ConfigManager.server().port;
  const server = ExpressServer.new(ExpressRouter.new()).server;

  // configure DB
  MemoryDB.getInstance();

  server.listen(port, () => console.log(`Server running`));
};

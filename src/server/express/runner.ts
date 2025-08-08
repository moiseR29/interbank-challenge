import { ExpressServer } from './Express';
import { ExpressRouter } from './Router';

export const expressRunner = () => {
  const port = 4000;
  const server = ExpressServer.new(ExpressRouter.new()).server;

  server.listen(port, () => console.log(`Server running`));
};

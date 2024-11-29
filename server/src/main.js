import http from 'node:http';

import { Config } from './common/index.js';
import * as controllerMap from './controllers/index.js';

const config = Config.load();

// No fallbacks for now
const controllers = Object.values(controllerMap)
  .map((controller) => new controller());

// I don't want to use express, just for fun
const server = http.createServer(async (req, res) => {
  const controller = controllers.find((controller) => controller.supports(req));

  if (!controller) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify({ message: 'Resource or Method not found' }));
    res.end();

    return;
  }

  await controller.handle(req, res);
});

server.listen(config.server.port, () => {
  console.log('Server is listening');
});

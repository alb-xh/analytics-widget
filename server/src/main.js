import http from 'node:http';
import path from 'node:path';
import logger from 'loglevel';
import Database from 'better-sqlite3';

import { Config, Request, Response, Env } from './common/index.js';
import { InMemoryCache, RateLimiter } from './components/index.js';
import { EventsController } from './controllers/index.js';

const config = Config.load();
logger.setLevel(config.env === Env.Dev ? 'DEBUG' : 'INFO')

const db = new Database(path.resolve('..', config.db.path));
const rateLimiter = new RateLimiter(new InMemoryCache());
const controllers = [
  new EventsController(db),
];

const server = http.createServer(async (request, response) => {
  const req = new Request(request);
  const res = new Response(response);

  if (!req.getIp()) return res.badRequest('Invalid request');
  if (!rateLimiter.grantAccess(req.getIp())) return res.forbidden('Too many requests');

  const controller = controllers.find((controller) => controller.supports(req));
  if (!controller) return res.notFound('Resource or Method not found');

  await controller.handle(req, res);
});

server.listen(config.server.port, () => {
  logger.info('Server is listening');
});

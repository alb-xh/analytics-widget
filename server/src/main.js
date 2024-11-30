import http from 'node:http';
import logger from 'loglevel';

import { Config, Request, Response, Env } from './common/index.js';
import { InMemoryCache, RateLimiter } from './components/index.js';
import { EventsController } from './controllers/index.js';
import { DB, EventsCollection } from './db/index.js';
import { GeoApi } from './apis/index.js';

const config = Config.load();
logger.setLevel(config.env === Env.Dev ? 'DEBUG' : 'INFO');

const db = new DB(config.db.path);
const eventsCollection = new EventsCollection(db);

const rateLimiter = new RateLimiter(new InMemoryCache());
const geoApi = new GeoApi(config.api.geo.url);

const controllers = [
  new EventsController(config.api.key, config.api.origin, eventsCollection, geoApi),
];

const server = http.createServer(async (request, response) => {
  const req = new Request(request);
  const res = new Response(response);

  try {
    if (!req.getIp()) return res.badRequest('Invalid request');
    if (!rateLimiter.grantAccess(req.getIp())) return res.forbidden('Too many requests');

    const controller = controllers.find((controller) => controller.supports(req));
    if (!controller) return res.notFound('Resource or Method not found');

    await controller.handle(req, res);
  } catch (err) {
    logger.error(err);
    res.serverError();
  }
});

server.listen(config.server.port, () => {
  logger.info('Server is listening');
});

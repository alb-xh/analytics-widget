import { z } from "zod";
import logger from 'loglevel';

import { customError, EventType } from "../common/index.js";
import { BaseController } from "./base.controller.js";

export class EventsController extends BaseController {
  static Error = customError('EventsController');

  static GetQuerySchema = z.object({
    app: z.string().min(3).max(20),
    type: z.enum(Object.values(EventType)),
    // date: z.preprocess((str) => new Date(str), z.date()),
    offset: z.preprocess(Number, z.number().min(0)).default(0),
    limit: z.preprocess(Number, z.number().min(0).max(100)).default(10),
  });

  static PostBodySchema = z.object({
    app: z.string().min(3).max(20),
    type: z.enum(Object.values(EventType)),
    timestamp: z.preprocess((str) => new Date(str), z.date())
  })

  constructor (apiKey, apiOrigin, eventsCollection, geoApi) {
    super('/events');

    this.apiKey = apiKey;
    this.apiOrigin = apiOrigin;
    this.eventsCollection = eventsCollection;
    this.geoApi = geoApi;
  }

  async get (req, res) {
    if (req.getAuthorization() !== `Bearer ${this.apiKey}`) {
      return res.unauthorized();
    }

    const { success, error, data } = EventsController.GetQuerySchema.safeParse(req.getQuery());
    if (!success) {
      logger.error(error);
      return res.badRequest();
    }

    const { type, app, offset, limit } = data;

    const results = await this.eventsCollection
      .find((entry) => entry.type === type && entry.app === app, { offset, limit });

    res.ok({ results });
  }

  async post (req, res) {
    if (!this.apiOrigin.includes(req.getOrigin())) {
      return res.forbidden();
    }

    const { success, error, data } = EventsController.PostBodySchema.safeParse(await req.getBody());
    if (!success) {
      logger.error(error);
      return res.badRequest();
    }

    const { app, type, timestamp } = data;
    const ip = req.getIp()
    const userAgent = req.getUserAgent();

    const geo = await this.geoApi.get(ip);

    await this.eventsCollection.insert({ app, type, timestamp, ip, userAgent, geo })

    res.created();
  }
}

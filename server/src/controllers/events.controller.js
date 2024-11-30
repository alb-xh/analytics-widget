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

  constructor (apiKey, eventsCollection, geoApi) {
    super('/events');

    this.apiKey = apiKey;
    this.eventsCollection = eventsCollection;
    this.geoApi = geoApi;
  }

  async get (req, res) {
    if (req.getAuthorization() !== `Bearer ${this.apiKey}`) {
      return res.unauthorized();
    }

    const query = req.getQuery();
    const queryValidation = EventsController.GetQuerySchema.safeParse(query);

    if (!queryValidation.success) {
      logger.error(queryValidation.error);
      return res.badRequest();
    }

    const { type, app, offset, limit } = query;

    const results = await this.eventsCollection
      .find((e) => e.type === type && e.app === app, { offset, limit });

    res.ok({ results });
  }

  async post (req, res) {
    const body = await req.getBody();

    const bodyValidation = EventsController.PostBodySchema.safeParse(body);
    if (!bodyValidation.success) {
      logger.error(bodyValidation.error);
      return res.badRequest();
    }

    const { app, type, timestamp } = body
    const ip = req.getIp()
    const userAgent = req.getUserAgent();

    const geo = await this.geoApi.get(ip);

    await this.eventsCollection.insert({ app, type, timestamp, ip, userAgent, geo })

    res.create();
  }
}

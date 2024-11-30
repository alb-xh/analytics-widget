import { z } from "zod";
import logger from 'loglevel';

import { customError } from "../common/index.js";
import { BaseController } from "./base.controller.js";

export const EventType = {
  View: 'view',
};

export class EventsController extends BaseController {
  static Error = customError('EventsController');
  static PostBodySchema = z.object({
    app: z.string().min(3).max(20),
    type: z.enum(Object.values(EventType)),
    timestamp: z.preprocess((str) => new Date(str), z.date())
  })

  constructor (db, geoApi) {
    super('/events');

    this.db = db;
    this.geoApi = geoApi;
  }

  get (req, res) {
    res.ok({ message: 'Hello World' });
  }

  async post (req, res) {
    const body = await req.getBody();

    const bodyValidation = EventsController.PostBodySchema.safeParse(body);
    if (!bodyValidation.success) {
      logger.error(bodyValidation.error);
      return res.badRequest();
    }

    const ip = req.getIp()
    const useragent = req.getUserAgent();

    const geoInfo = await this.geoApi.get(ip);

    res.ok({ ip, useragent, ...body, geoInfo });
  }
}

import { z } from 'zod';

import { EventType } from '../common/index.js';
import { BaseCollection } from './base.collection.js';

export class EventsCollection extends BaseCollection {
  constructor (db) {
    super(
      'events',
      z.object({
        app: z.string().min(3).max(25),
        type: z.enum(Object.values(EventType)),
        ip: z.string().ip(),
        userAgent: z.string(),
        geo: z.object(z.any()),
        timestamp: z.date(),
      }),
      db,
    );
  }
}
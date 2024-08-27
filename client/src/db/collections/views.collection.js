import { z } from "zod";
import { and, where, query } from 'firebase/firestore/lite';

import { Utils } from "../../components/utils.component";
import { BaseCollection } from "./base.collection";
import { Logger } from "../../components/logger.component";
import { CollectionNameResolver } from "../components/collection-name.resolver";

export class ViewsCollection extends BaseCollection {
  static Name = CollectionNameResolver.resolve('views');

  static Schema = z.object({
    ip: z.string().ip().optional(),
    visitorId: z.string().optional(),
    geo: z.any().optional(), // Investigate better approach later
    count: z.number().int(),
    date: z.string().min(6),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  });

  constructor (db, notify) {
    super(db);
    this.notify = notify
  }

  // Transaction needed or investigate the api in depth
  async saveView (data) {
    Logger.debug('ViewCollection', 'saveView', data);

    const doc = await this.findOne(query(this.collection, and(
      where('date', '==', Utils.getDate()),
      where('ip', '==', data.ip),
      where('visitorId', '==', data.visitorId)
    )));

    Logger.debug('ViewCollection', 'saveView', 'doc', doc);

    const now = Utils.now();
    const date = Utils.getDate(now);

    if (doc) {
      const update = {
        ...data,
        count: doc.count + 1,
        date,
        updatedAt: now,
        createdAt: doc.createdAt,
      };

      await this.update(doc.id, update);

      Logger.debug('ViewCollection', 'saveView', 'update', update);

      return;
    }

    const insert = {
      ...data,
      count: 1,
      date: date,
      createdAt: now,
      updatedAt: now,
    };

    await this.insert(insert);

    Logger.debug('ViewCollection', 'saveView', 'insert', insert);
  }

  async afterInsert (document) {
    try {
      Logger.debug('ViewCollection', 'afterInsert', 'triggered');

      await this.notify.send({ collection: ViewsCollection.Name, id: document.id });

      Logger.debug('ViewCollection', 'afterInsert', 'success');
    } catch (err) {
      Logger.error('ViewCollection', 'afterInsert', 'failed', err);
    }
  }
}
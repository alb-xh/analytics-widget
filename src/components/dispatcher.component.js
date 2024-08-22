import { Logger } from "./logger.component";
import { Queue } from "./queue.component";
import { Utils } from "./utils.component";

export class Dispatcher {
  static eventsQueue = new Queue('Events');

  constructor (db, ipFetcher, fingerprint) {
    this.db = db;
    this.ipFetcher = ipFetcher;
    this.fingerprint = fingerprint;
  }

  sendViewEvent () {
    const viewsCollection = this.db.getCollection('views');
    const data = {};

    Dispatcher.eventsQueue.push(async () => {
      data.visitorId ??= await this.fingerprint.getVisitorId();

      Logger.debug('Dispatcher', 'sendViewEvent', 'visitorId', data.visitorId);

      data.ip ??= await this.ipFetcher.fetch();

      Logger.debug('Dispatcher', 'sendViewEvent', 'ip', data.ip);

      await viewsCollection.saveView(data);

      Logger.debug('Dispatcher', 'sendViewEvent', 'handled');
    });

    Logger.debug('Dispatcher', 'sendViewEvent', 'added to queue');
  }
}

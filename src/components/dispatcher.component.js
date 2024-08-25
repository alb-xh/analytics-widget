import { Logger } from "./logger.component";
import { Queue } from "./queue.component";
import { Utils } from "./utils.component";

export class Dispatcher {
  static eventsQueue = new Queue('Events');

  constructor (db, fingerprint, ipFetcher, geoLookup) {
    this.db = db;
    this.fingerprint = fingerprint;
    this.ipFetcher = ipFetcher;
    this.geoLookup = geoLookup;
  }

  sendViewEvent () {
    const viewsCollection = this.db.getCollection('views');
    const data = {};

    Dispatcher.eventsQueue.push(async () => {
      data.visitorId ??= await this.fingerprint.getVisitorId();

      Logger.debug('Dispatcher', 'sendViewEvent', 'visitorId', data.visitorId);

      data.ip ??= await this.ipFetcher.fetch();

      Logger.debug('Dispatcher', 'sendViewEvent', 'ip', data.ip);

      if (data.ip) {
        data.geo ??= await this.geoLookup.lookup();

        Logger.debug('Dispatcher', 'sendViewEvent', 'geo', data.geo);
      }

      await viewsCollection.saveView(data);

      Logger.debug('Dispatcher', 'sendViewEvent', 'handled');
    });

    Logger.debug('Dispatcher', 'sendViewEvent', 'added to queue');
  }
}

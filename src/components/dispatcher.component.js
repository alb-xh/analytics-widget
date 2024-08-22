import { Logger } from "./logger.component";
import { Queue } from "./queue.component";

export class Dispatcher {
  static eventsQueue = new Queue('Events');

  constructor (db, ipFetcher) {
    this.db = db;
    this.ipFetcher = ipFetcher;
  }

  sendViewEvent () {
    const viewCollection = this.db.getCollection('view');

    Dispatcher.eventsQueue.push(async () => {
      this.ip = this.ip ?? await this.ipFetcher.fetch();

      Logger.debug('Dispatcher', 'sendViewEvent', 'ip', this.ip);

      await viewCollection.insert({
        ip: this.ip,
        createdAt: new Date().toISOString()
      });

      Logger.debug('Dispatcher', 'sendViewEvent', 'handled');
    });

    Logger.debug('Dispatcher', 'sendViewEvent', 'added to queue');
  }
}

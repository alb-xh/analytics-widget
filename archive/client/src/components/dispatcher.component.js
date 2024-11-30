import { Logger } from "./logger.component";
import { Queue } from "./queue.component";
import { Utils } from "./utils.component";

export class Dispatcher {
  static eventsQueue = new Queue('Events');

  constructor (db, dataResolver) {
    this.db = db;
    this.dataResolver = dataResolver;
  }

  sendViewEvent () {
    const viewsCollection = this.db.getCollection('views');

    Dispatcher.eventsQueue.push(async () => {
      Logger.debug('Dispatcher', 'sendViewEvent', 'started');

      const data = await this.dataResolver.resolve();
      await viewsCollection.saveView(data);

      Logger.debug('Dispatcher', 'sendViewEvent', 'handled');
    });

    Logger.debug('Dispatcher', 'sendViewEvent', 'added to queue');
  }
}

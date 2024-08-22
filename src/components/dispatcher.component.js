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

      await viewCollection.insert({
        ip: this.ip,
        createdAt: new Date().toISOString()
      });
    });
  }
}

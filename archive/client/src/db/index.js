import { ViewsCollection } from "./collections/views.collection";

export class Db {
  static InvalidCollectionName = class extends Error {
    constructor (name) {
      super(`Invalid collection name: ${name}`);
    }
  }

  constructor (firebase, notify) {
    const db = firebase.getDb();
    this.viewsCollection = new ViewsCollection(db, notify);
  }

  getCollection (name) {
    const collectionName = `${name.toLowerCase()}Collection`;
    const collection = this[collectionName];

    if (!collection) {
      throw new InvalidCollectionName(name);
    }

    return collection;
  }
}

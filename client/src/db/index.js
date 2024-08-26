import {  } from 'firebase/firestore/lite';

import { ViewsCollection } from "./collections/views.collection";

export class Db {
  static InvalidCollectionName = class extends Error {
    constructor (name) {
      super(`Invalid collection name: ${name}`);
    }
  }

  constructor (firebase) {
    const db = firebase.getDb();
    this.viewsCollection = new ViewsCollection(db);
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

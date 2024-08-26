import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';

export class Firebase {
  constructor (config) {
    this.app = initializeApp(config);
    this.db = getFirestore(this.app);
  }

  getApp () {
    return this.app;
  }

  getDb () {
    return this.db;
  }
}

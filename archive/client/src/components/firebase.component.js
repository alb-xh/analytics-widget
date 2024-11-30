import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';

import { Config } from './config.component';

export class Firebase {
  constructor () {
    this.app = initializeApp(Config.getFirebaseConfig());
    this.db = getFirestore(this.app);
  }

  getApp () {
    return this.app;
  }

  getDb () {
    return this.db;
  }
}

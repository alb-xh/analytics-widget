import { z } from "zod";

import { Validator } from "./validator.component";

export class Config {
  static validator = new Validator('ConfigSchema', z.object({
    'WIDGET_NAME': z.string().min(4).max(30),
    'IP_API_URL': z.string().url(),
    'FIREBASE_API_KEY': z.string().min(4).max(50),
    'FIREBASE_AUTH_DOMAIN': z.string().min(4).max(50),
    'FIREBASE_PROJECT_ID': z.string().min(4).max(50),
    'FIREBASE_STORAGE_BUCKET': z.string().min(4).max(50),
    'FIREBASE_MESSAGING_SENDER_ID': z.string().min(4).max(50),
    'FIREBASE_APP_ID': z.string().min(4).max(50),
  }));

  constructor (env) {
    Config.validator.validate(env);

    this.env = env;
  }

  getWidgetName () {
    return this.env['']
  }

  getIpApiUrl () {
    return this.env['IP_API_URL'];
  }

  getFirebaseConfig () {
    return {
      apiKey: this.env['FIREBASE_API_KEY'],
      authDomain: this.env['FIREBASE_AUTH_DOMAIN'],
      projectId: this.env['FIREBASE_PROJECT_ID'],
      storageBucket: this.env['FIREBASE_STORAGE_BUCKET'],
      messagingSenderId: this.env['FIREBASE_MESSAGING_SENDER_ID'],
      appId: this.env['FIREBASE_APP_ID'],
    };
  }
}

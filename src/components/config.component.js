import { z } from "zod";

import { Validator } from "./validator.component";

export class Config {
  static validator = new Validator('ConfigSchema', z.object({
    'DEBUG': z.boolean(),
    'WIDGET_NAME': z.string().min(4).max(30),
    'IP_API_URL': z.string().url(),
    'FIREBASE_API_KEY': z.string().min(4).max(50),
    'FIREBASE_AUTH_DOMAIN': z.string().min(4).max(50),
    'FIREBASE_PROJECT_ID': z.string().min(4).max(50),
    'FIREBASE_STORAGE_BUCKET': z.string().min(4).max(50),
    'FIREBASE_MESSAGING_SENDER_ID': z.string().min(4).max(50),
    'FIREBASE_APP_ID': z.string().min(4).max(50),
  }));

  static validate () {
    return Config.validator.validate(process.env);
  }

  static getDebug () {
    return process.env['DEBUG'];
  }

  static getWidgetName () {
    return process.env['WIDGET_NAME']
  }

  static getIpApiUrl () {
    return process.env['IP_API_URL'];
  }

  static getFirebaseConfig () {
    return {
      apiKey: process.env['FIREBASE_API_KEY'],
      authDomain: process.env['FIREBASE_AUTH_DOMAIN'],
      projectId: process.env['FIREBASE_PROJECT_ID'],
      storageBucket: process.env['FIREBASE_STORAGE_BUCKET'],
      messagingSenderId: process.env['FIREBASE_MESSAGING_SENDER_ID'],
      appId: process.env['FIREBASE_APP_ID'],
    };
  }
}

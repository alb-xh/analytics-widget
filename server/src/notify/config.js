import { z } from "zod";

import { BaseConfig } from "../common/base-config.js";

export class Config extends BaseConfig {
  constructor () {
    super (z.object({
      SMTP_SERVICE: z.string(),
      SMTP_HOST: z.string(),
      SMTP_PORT: z.preprocess(Number, z.number()),
      SMTP_SECURE: z.preprocess(Boolean, z.boolean()),
      SMTP_USER: z.string().email(),
      SMTP_PASS: z.string(),
      FIREBASE_API_KEY: z.string(),
      FIREBASE_AUTH_DOMAIN: z.string(),
      FIREBASE_PROJECT_ID: z.string(),
      FIREBASE_STORAGE_BUCKET: z.string(),
      FIREBASE_MESSAGING_SENDER_ID: z.string(),
      FIREBASE_APP_ID: z.string(),
    }));
  }

  getSmtpConfig () {
    return {
      service: process.env['SMTP_SERVICE'],
      host: process.env['SMTP_HOST'],
      port: process.env['SMTP_PORT'],
      secure: process.env['SMTP_SECURE'],
      auth: {
        user: process.env['SMTP_USER'],
        pass: process.env['SMTP_PASS'],
      },
    };
  }

  getFirebaseConfig () {
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

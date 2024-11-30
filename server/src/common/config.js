import process from 'node:process';
import dotenv from 'dotenv';
import { z } from "zod";

import { Env } from './constants.js';
import { customError } from './custom-error.js';

export class Config {
  static Error = customError('Config');

  static schema = z.object({
    NODE_ENV: z.enum(Object.values(Env))
      .default(Env.Prod),
    SERVER_PORT: z.preprocess(Number, z.number()),
    DB_PATH: z.string(),
    API_KEY: z.string(),
    API_GEO_URL: z.string(),
    SMTP_SERVICE: z.string(),
    SMTP_HOST: z.string(),
    SMTP_PORT: z.preprocess(Number, z.number()),
    SMTP_SECURE: z.preprocess(Boolean, z.boolean()),
    SMTP_USER: z.string().email(),
    SMTP_PASS: z.string(),
  })

  static load () {
    dotenv.config();

    const { success, error } = Config.schema.safeParse(process.env);

    if (!success) {
      throw new Config.Error(`Issues: ${JSON.stringify(error.issues)}: Value: ${JSON.stringify(process.env)}`)
    }

    return {
      env: process.env['NODE_ENV'],
      server: {
        port: process.env['SERVER_PORT'],
      },
      db: {
        path: process.env['DB_PATH'],
      },
      api: {
        key: process.env['API_KEY'],
        geo: {
          url: process.env['API_GEO_URL'],
        },
      },
      smtp: {
        service: process.env['SMTP_SERVICE'],
        host: process.env['SMTP_HOST'],
        port: process.env['SMTP_PORT'],
        secure: process.env['SMTP_SECURE'],
        auth: {
          user: process.env['SMTP_USER'],
          pass: process.env['SMTP_PASS'],
        },
      },
    };
  }
}

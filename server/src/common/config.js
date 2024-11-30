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
    API_ORIGIN: z.preprocess((str) => str.split(','), z.array(z.string().url())),
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

    const { success, error, data } = Config.schema.safeParse(process.env);

    if (!success) {
      throw new Config.Error(`Issues: ${JSON.stringify(error.issues)}: Value: ${JSON.stringify(process.env)}`)
    }

    return {
      env: data['NODE_ENV'],
      server: {
        port: data['SERVER_PORT'],
      },
      db: {
        path: data['DB_PATH'],
      },
      api: {
        key: data['API_KEY'],
        origin: data['API_ORIGIN'],
        geo: {
          url: data['API_GEO_URL'],
        },
      },
      smtp: {
        service: data['SMTP_SERVICE'],
        host: data['SMTP_HOST'],
        port: data['SMTP_PORT'],
        secure: data['SMTP_SECURE'],
        auth: {
          user: data['SMTP_USER'],
          pass: data['SMTP_PASS'],
        },
      },
    };
  }
}

import dotenv from 'dotenv';
import { z } from "zod";

import { Validator } from './validator.js';

export const Env = {
  Dev: 'development',
  Prod: 'production',
};

export class BaseConfig {
  constructor (schema) {
    this.validator = new Validator('Config', schema.extend({
      NODE_ENV: z.enum(Object.values(Env))
        .default(Env.Prod),
    }));
  }

  load () {
    dotenv.config();
    this.validator.validate(process.env);
  }

  getEnv () {
    return process.env['NODE_ENV'];
  }

  isDev () {
    return this.getEnv() === Env.Dev;
  }

  isProd () {
    return this.getEnv === Env.Prod;
  }
}

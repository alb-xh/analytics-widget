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
    }));
  }

  getSMTP () {
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
}

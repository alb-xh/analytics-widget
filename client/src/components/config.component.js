import { z } from "zod";

import { Validator } from "./validator.component";

export class Config {
  static validator = new Validator('ConfigSchema', z.object({
    'DEBUG': z.boolean(),
    'WIDGET_NAME': z.string().min(4).max(30),
  }));

  static validate () {
    return Config.validator.validate(process.env);
  }

  static getDebug () {
    return process.env['DEBUG'];
  }

  static getWidgetName () {
    return process.env['WIDGET_NAME'];
  }
}


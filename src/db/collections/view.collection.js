import { z } from "zod";

import { BaseCollection } from "./base.collection";

export class ViewCollection extends BaseCollection {
  static Name = 'view';

  static Schema = {
    ip: z.string().ip().optional(),
    createdAt: z.string().datetime(),
  }
}
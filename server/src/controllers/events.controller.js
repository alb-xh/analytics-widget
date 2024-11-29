import { customError } from "../common/index.js";
import { BaseController } from "./base.controller.js";

export class EventsController extends BaseController {
  static Error = customError('EventsController');

  constructor (db) {
    super('/events');

    this.db = db;
  }

  get (req, res) {
    res.ok({ message: 'Hello World' });
  }
}

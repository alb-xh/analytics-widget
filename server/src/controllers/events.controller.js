import { customError } from "../common/index.js";
import { BaseController } from "./base.controller.js";

export class EventsController extends BaseController {
  static Error = customError('EventsController');

  constructor () {
    super('/events');
  }

  get (req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.write(JSON.stringify({ message: 'Hello World' }))
    res.end();
  }
}

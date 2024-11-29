import { customError } from '../common/index.js';

export class BaseController {
  static Error = customError(BaseController.name);

  constructor (resource) {
    if (!resource.startsWith('/') || resource.length <= 1) {
      throw new BaseController.Error(`Invalid resource: ${resource}`);
    }

    this.resource = resource;
  }

  supports (req) {
    const [ pathname ] = (req.url ?? '/').split('?');
    return pathname === this.resource && req.method.toLowerCase() in this; // Maybe a bit risky
  }

  handle (req, res) {
    if (!this.supports(req)) {
      throw new BaseController.Error('Unsupported request');
    }

    const handler = this[req.method.toLowerCase()];

    return handler(req, res);
  }
}
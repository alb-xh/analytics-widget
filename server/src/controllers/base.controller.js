import logger from 'loglevel';

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
    return req.getResource() === this.resource && req.getMethod().toLowerCase() in this;
  }

  handle (req, res) {
    if (!this.supports(req)) {
      throw new BaseController.Error('Unsupported request');
    }

    logger.info(`${req.getMethod()} ${this.resource}`);

    const handler = this[req.getMethod().toLowerCase()];

    return handler(req, res);
  }
}
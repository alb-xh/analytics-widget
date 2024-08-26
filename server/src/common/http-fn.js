import functions from '@google-cloud/functions-framework';
import logger from 'loglevel';

import { Forbidden, InternalServerError, Ok } from './responses.js';

export class HttpFn {
  static create ({ name, method }, handler) {
    const nName = name.toLowerCase();
    const nMethod = method.toUpperCase();
    const ctx = { name: `${HttpFn.name}: ${nName}: ${nMethod}` };

    functions.http(nName, async (req, res) => {
      let response;

      try {
        logger.debug(`${ctx.name}: Request`);

        if (req.method.toUpperCase() !== nMethod) {
          response = new Forbidden();
          return;
        }

        response = await handler(req, res, ctx) ?? new Ok();;
      } catch (err) {
        logger.error(`${ctx.name}: ${err.toString()}`);

        response = new InternalServerError();
      } finally {
        logger.debug(`${ctx.name}: Response: ${JSON.stringify(response)}`);

        res.status(response.code)
          .json(response);
      }
    });
  }
}

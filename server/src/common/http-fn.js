import functions from '@google-cloud/functions-framework';
import logger from 'loglevel';

import { Forbidden, InternalServerError, Ok } from './responses.js';

export class HttpFn {
  static create ({ name, method, headers, cors }, handler) {
    const nName = name.toLowerCase();
    const nMethod = method.toUpperCase();
    const nHeaders = headers ?? {};
    const nCors = cors ?? true;
    const ctx = { name: `${HttpFn.name}: ${nName}: ${nMethod}` };

    functions.http(nName, async (req, res) => {
      let response;

      if (nCors !== true) {
        res.set('Access-Control-Allow-Origin', nCors === false ? '*' : nCors);

        if (req.method === 'OPTIONS') {
          res
            .set('Access-Control-Allow-Methods', nMethod)
            .set('Access-Control-Allow-Headers', '*') // Maybe improve in future
            .set('Ac')
            .status(204)
            .send('');

          return;
        }
      }

      try {
        logger.debug(`${ctx.name}: Request`);

        if (req.method !== nMethod) {
          response = new Forbidden();
          return;
        }

        response = await handler(req, res, ctx) ?? new Ok();;
      } catch (err) {
        logger.error(`${ctx.name}: ${err.toString()}`);

        response = new InternalServerError();
      } finally {
        logger.debug(`${ctx.name}: Response: ${JSON.stringify(response)}`);


        res
          .set(nHeaders)
          .status(response.code)
          .json(response);
      }
    });
  }
}

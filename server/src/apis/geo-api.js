import https from 'node:https';
import { URL , urlToHttpOptions } from 'node:url';

import { requestData } from '../common/index.js';

export class GeoApi {
  constructor (url) {
    this.url = url;
  }

  async get (ip) {
    const url = new URL(ip, this.url);

    return new Promise((resolve, reject) => {
      https
        .request(urlToHttpOptions(url), (req) => {
          requestData(req)
            .then(resolve)
            .catch(reject);
        })
        .on('error', reject)
        .end();
    });
  }
}
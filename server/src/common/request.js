import { URLSearchParams } from 'node:url';

import { requestData } from "./request-data.js";

export class Request {
  constructor (req) {
    this.req = req;
  }

  getIp () {
    return this.req.headers['x-forwarded-for'] ?? this.req.socket.remoteAddress;
  }

  getMethod () {
    return this.req.method;
  }

  getResource () {
    const [ resource ] = (this.req.url ?? '/').split('?');
    return resource;
  }

  getUserAgent () {
    return this.req.headers['user-agent'];
  }

  getAuthorization () {
    return this.req.headers['authorization'];
  }

  async getBody () {
    return requestData(this.req);
  }

  getQuery () {
    const [ _, queryStr = '' ] = (this.req.url ?? '/').split('?');
    return Object.fromEntries(new URLSearchParams(queryStr));
  }
}
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
}
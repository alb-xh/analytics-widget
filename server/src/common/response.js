export class Response {
  constructor (res) {
    this.res = res;
  }

  json (status, body = {}, headers = {}) {
    this.res.writeHead(status, { ...headers, 'Content-Type': 'application/json' });
    this.res.write(JSON.stringify(body));
    this.res.end();
  }

  badRequest (message = 'BadRequest') {
    this.json(400, { message })
  }

  forbidden (message = 'Forbidden') {
    this.json(403, { message });
  }

  notFound (message = 'NotFound') {
    this.json(404, { message });
  }

  serverError (message = 'Internal Server Error') {
    this.json(500, { message });
  }

  ok (body) {
    this.json(200, body);
  }
}

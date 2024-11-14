export class Response {
  constructor (code, message) {
    this.code = code;
    this.message = message;
  }
}

export class Ok extends Response { constructor () { super(200, 'OK'); } }
export class BadRequest extends Response { constructor () { super(400, 'BadRequest') } }
export class Unauthorized extends Response { constructor () { super(401, 'Unauthorized'); } }
export class Forbidden extends Response { constructor () { super(403, 'Forbidden'); } }
export class NotFound extends Response { constructor () { super(404, 'Not Found'); } }
export class Conflict extends Response { constructor () { super(409, 'Conflict'); } }
export class InternalServerError extends Response { constructor () { super(500, 'InternalServerError'); } }

import { setInterval } from 'node:timers';

const isExpired = (expiresAt) => expiresAt <= Date.now();

export class InMemoryCache extends Map {
  constructor (options = {}) {
    super();

    const clean = () => {
      for (const [ key, value ] of this.entries()) {
        if (isExpired(value.expiresAt)) {
          this.delete(key);
        }
      }
    };

    this.ttl = options.ttl ?? 100;
    this.clean = setInterval(clean, options.cleanMs ?? 1000);
  }

  set (key, value, ttl = this.ttl) {
    super.set(key, { value, expiresAt: Date.now() + ttl })
  }

  has (key) {
    return super.has(key) && !isExpired(super.get(key).expiresAt);
  }

  get (key) {
    return this.has(key) ? super.get(key).value : null;
  }
}

import logger from 'loglevel';

export class RateLimiter {
  constructor (cache, options = {}) {
    this.cache = cache;
    this.ttl = options.ttl ?? 60000;
    this.maxHits = options.maxHits ?? 100;
  }

  grantAccess (ip) {
    const retainKey = `RateLimiter:${ip}:retain`;
    const hitsKey = `RateLimiter:${ip}:hits`;

    if (!this.cache.has(retainKey)) {
      this.cache.set(retainKey, true, this.ttl);
      this.cache.set(hitsKey, 1, this.ttl);

      logger.debug(`${hitsKey}: 1`);

      return true;
    }

    const hits = this.cache.get(hitsKey) + 1;
    this.cache.set(hitsKey, hits, this.ttl);

    logger.debug(`${hitsKey}: ${hits}`);

    return hits <= this.maxHits;
  }
}
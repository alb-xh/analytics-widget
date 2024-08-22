import { Config } from "./config.component";
import { Logger } from "./logger.component";

export class IpFetcher {
  constructor (apiUrl) {
    this.apiUrl = new URL(apiUrl);
  }

  async fetch () {
    Logger.debug('IpFetcher', 'fetching');

    let ip = '85.214.132.117';

    if (!Config.getDebug()) {
      const res = await fetch(this.apiUrl);
      const data = await res.json();

      ip = data.ip;
    }

    Logger.debug('IpFetcher', 'ip', ip);

    return ip;
  }
}

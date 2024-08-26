import { Config } from "./config.component";

export class IpFetcher {
  constructor (apiUrl) {
    this.apiUrl = new URL(apiUrl);
  }

  async fetch () {
    let ip = '85.214.132.117';

    if (!Config.getDebug()) {
      const res = await fetch(this.apiUrl);
      const data = await res.json();

      ip = data.ip;
    }

    return ip;
  }
}

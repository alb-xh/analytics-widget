import { Config } from "../config.component";
import { Logger } from "../logger.component";

export class IpDataResolver {
  static mockIp = '85.214.132.117';

  async resolve (data) {
    data.ip = await this.resolveIp();

    Logger.debug('IpDataResolver', 'ip', data.ip);
  }

  async resolveIp () {
    if (Config.getDebug()) {
      return IpDataResolver.mockIp;
    }

    return fetch(Config.getIpApiUrl())
    .then((r) => r.json());
  }
}

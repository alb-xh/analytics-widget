import { FingerPrintDataResolver } from "./fingerprint.data-resolver";
import { UserAgentDataResolver } from "./user-agent.data-resolver";
import { IpDataResolver } from "./ip.data-resolver";
import { GeoDataResolver } from "./geo.data-resolver";

export class DataResolver {
  dataResolvers = [
    new FingerPrintDataResolver(),
    new UserAgentDataResolver(),
    new IpDataResolver(),
    new GeoDataResolver(),
  ];

  async resolve () {
    const data = {};

    for (const resolver of this.dataResolvers) {
      await resolver.resolve(data);
    }

    return data;
  }
}
import { Config } from "../config.component";
import { Logger } from "../logger.component";

export class GeoDataResolver {
  static mockGeoInfo = {
    "ipVersion": 4,
    "ipAddress": "46.252.47.162",
    "latitude": 41.327499,
    "longitude": 19.81889,
    "countryName": "Albania",
    "countryCode": "AL",
    "timeZone": "+02:00",
    "zipCode": "1033",
    "cityName": "Tirana",
    "regionName": "Tirane",
    "isProxy": false,
    "continent": "Europe",
    "continentCode": "EU",
    "currency": {
    "code": "ALL",
    "name": "Lek"
    },
    "language": "Albanian",
    "timeZones": [
    "Europe/Tirane"
    ],
    "tlds": [
    ".al"
    ]
  };

  async resolve (data) {
    data.geo = await this.resolveGeo(data);

    Logger.debug('GeoDataResolver', 'geo', data.geo);
  }

  async resolveGeo (data) {
    if (Config.getDebug()) {
      return GeoDataResolver.mockGeoInfo;
    }

    if (!data.ip) {
      return null;
    }

    return fetch(new URL(data.ip, Config.getGeoApiUrl()))
      .then((r) => r.json());
  }
}

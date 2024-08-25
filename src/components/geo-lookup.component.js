import { Config } from "./config.component";

export class GeoLookup {
  static mockData = {
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

  constructor (apiUrl) {
    this.apiUrl = new URL(apiUrl);
  }

  async lookup (ip) {
    let data = GeoLookup.mockData;

    if (!Config.getDebug()) {
      const res = await fetch(new URL(ip, this.apiUrl));
      data = await res.json();
    }

    return data;
  }
}

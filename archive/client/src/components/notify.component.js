import { Config } from "./config.component";

export class Notify {
  async send (data) {
    return fetch(Config.getNotifyApiUrl(), {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'omit',
    }).then((r) => r.json());
  }
}

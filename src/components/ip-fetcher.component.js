export class IpFetcher {
  constructor (apiUrl) {
    this.apiUrl = new URL(apiUrl);
  }

  async fetch () {
    const res = await fetch(this.apiUrl);
    const data = await res.json();

    return data.ip;
  }
}

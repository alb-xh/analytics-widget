export class ApiClient {
  constructor (baseUrl) {
    this.baseUrl = baseUrl;
  }

  async sendEvent (event) {
    return fetch(new URL('events', this.baseUrl), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(event),
      mode: 'no-cors',
    });
  }
}

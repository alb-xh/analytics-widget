export class Notify {
  constructor (apiUrl) {
    this.apiUrl = new URL(apiUrl);
  }

  async send (data) {
    const res = await fetch(this.apiUrl, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    });

    return res.json();
  }
}

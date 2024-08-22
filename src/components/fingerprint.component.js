import * as fp from '@fingerprintjs/fingerprintjs';

export class FingerPrint {
  async getVisitorId () {
    this.fp = this.fp ?? await fp.load();
    const res = await this.fp.get();

    return res.visitorId;
  }
}
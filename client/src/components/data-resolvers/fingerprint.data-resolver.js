import * as fp from '@fingerprintjs/fingerprintjs';

import { Logger } from '../logger.component';

export class FingerPrintDataResolver {
  async resolve (data) {
    this.fp = this.fp ?? await fp.load();
    const res = await this.fp.get();

    data.visitorId = res.visitorId;

    Logger.debug('FingerPrintDataResolver', 'visitorId', data.visitorId);
  }
}
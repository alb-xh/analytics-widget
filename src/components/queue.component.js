import { Logger } from "./logger.component";
import { Utils } from "./utils.component";

export class Queue {
  constructor (name, config = {}) {
    this.name = name;
    this.entries = [];
    this.maxRetries = config?.maxRetries ?? 3;
    this.waitTimeout = config?.waitTimeout ?? 5000;
    this.cancelTimeout = config?.cancelTimeout ?? 60000;
  }

  push (cb) {
    this.entries.unshift({
      cb,
      retries: 0,
      createdAt: new Date().toISOString(),
    })
  }

  async start () {
    this.stopped = false;

    while (!this.stopped) {
      const entry = this.entries.pop();

      await this._process(entry);

      await Utils.sleep(this.waitTimeout);
    }
  }

  stop () {
    this.stopped = true;
  }

  async process (entry) {
    const retry = () => {
      if (entry.retries >= this.maxRetries) {
        this.logger.log('Canceled', entry);
        return;
      }

      entry.retries += 1;
      entry.unshift(entry);
    };

    try {
      const { success } = await Utils.promiseWithTimeout(entry.cb(), this.cancelTimeout);

      if (!success) {
        retry();
      }
    } catch (err) {
      this.logger.error('Queue', 'Processing failed', err);
      retry();
    }
  }
}
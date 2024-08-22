import { Logger } from "./logger.component";
import { Utils } from "./utils.component";

export class Queue {
  constructor (name, config = {}) {
    this.name = name;
    this.entries = [];
    this.processing = false;
    this.maxRetries = config?.maxRetries ?? 2;
    this.waitTimeout = config?.waitTimeout ?? 1000;
    this.cancelTimeout = config?.cancelTimeout ?? 60000;
  }

  push (cb) {
    const entry = {
      cb,
      retries: 0,
      createdAt: new Date().toISOString(),
    };

    Logger.debug(`${this.name} Queue`, 'new entry was pushed', entry);

    this.entries.unshift(entry);

    this.process();
  }

  async process () {
    if (this.processing) {
      return;
    }

    this.processing = true;

    Logger.debug(`${this.name} Queue`, 'processing started');

    while (this.entries.length > 0) {
      const entry = this.entries.pop();

      if (entry) {
        await this.processEntry(entry);
      }

      await Utils.sleep(this.waitTimeout);
    }

    this.processing = false;

    Logger.debug(`${this.name} Queue`, 'processing ended');
  }

  async processEntry (entry) {
    const retry = () => {
      if (entry.retries >= this.maxRetries) {
        Logger.error(`${this.name} Queue`, 'canceled', entry);
        return;
      }

      entry.retries += 1;
      this.entries.unshift(entry);
    };

    try {
      const { success } = await Utils.promiseWithTimeout(entry.cb(), this.cancelTimeout);

      if (!success) {
        retry();
      }
    } catch (err) {
      Logger.error(`${this.name} Queue`, 'processing failed', err);

      retry();
    }
  }
}
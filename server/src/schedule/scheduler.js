import { setInterval, clearInterval } from 'node:timers';

import { customError, safeExecution } from '../common/index.js';
import { BaseRule } from './rules/base.rule.js';

export class Scheduler {
  static Error = customError(Scheduler.name);

  constructor (options) {
    this.map = new Map();
    this.cycleMs = options.cycleMs ?? 1000;
  }

  register (name, rule, action) {
    if (!(rule instanceof BaseRule)) throw new Scheduler.Error(`Invalid rule for job: ${name}`);

    this.map.set(name, { rule, action });
  }

  run () {
    logger.info('Scheduler started');

    const cycle = () => {
      for (const [ name, { rule, action } ] of this.map.entries()) {
        safeExecution(async () => {
          if (Date.now() < rule.getTime()) return;

          logger.info(`Scheduler:${name}:job:started`);

          await action();
        });

        continue;
      }
    }

    this.interval = setInterval(cycle, this.cycleMs);
  }

  stop() {
    logger.info('Scheduler stopped');

    if (this.interval) clearInterval(this.interval);
  }
}
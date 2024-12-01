import { setInterval, clearInterval } from 'node:timers';
import logger from 'loglevel';

import { customError, safeExecution } from '../common/index.js';
import { BaseRule } from './rules/base.rule.js';
import { BaseJob } from './jobs/base.job.js';

export class Scheduler {
  static Error = customError(Scheduler.name);

  constructor (options = {}) {
    this.map = new Map();
    this.cycleMs = options.cycleMs ?? 1000;
  }

  register (job, rule) {
    if (!(job instanceof BaseJob)) throw new Scheduler.Error(`Invalid job`);
    if (!(rule instanceof BaseRule)) throw new Scheduler.Error(`Invalid rule for job: ${job.name}`);

    this.map.set(job, rule);
  }

  start () {
    logger.info('Scheduler started');

    const cycle = () => {
      const now = Date.now();

      for (const [ job, rule ] of this.map.entries()) {
        safeExecution(async () => {
          const time = rule.getTime();

          // Sufficient for now, but risky
          if (now < time.setMilliseconds(0) || now > time.setMilliseconds(999)) return;

          logger.info(`Scheduler:${job.name}:job:started`);

          await job.run();

          logger.info(`Scheduler:${job.name}:job:ended`);
        });
      }
    }

    this.interval = setInterval(cycle, this.cycleMs);
  }

  stop() {
    logger.info('Scheduler stopped');

    if (this.interval) clearInterval(this.interval);
  }
}
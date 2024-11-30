import { BaseRule } from "./rules/base.rule.js";

export class DailyRule extends BaseRule {
  static Error = customError(DailyRule.name);
  static Regex = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/;

  constructor (time) {
    super('daily');

    if (!DailyRule.Regex.test(time)) throw new DailyRule.Error(`Invalid time: ${time}`);

    this.time = time;
  }

  getTime () {
    const [ hours, minutes ] = this.time.split(':').map(Number);

    const now = new Date();
    now.setUTCHours(hours, minutes, 0, 0);

    return now;
  }
}


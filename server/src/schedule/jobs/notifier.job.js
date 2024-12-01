import { BaseJob } from "./base.job.js";

export class NotifierJob extends BaseJob {
  constructor (smtpConfig, mailTransporter, eventsCollection) {
    super('notifier-job');

    this.smtpConfig = smtpConfig;
    this.mailTransporter = mailTransporter;
    this.eventsCollection = eventsCollection;
  }

  async run () {
    const startOfDay = new Date();
    startOfDay.setUTCHours(0,0,0,0);

    const events = await this.eventsCollection.find((entry) => new Date(entry.timestamp) >= startOfDay);
    const aggregation = events.reduce((acc, event) => {
      acc[event.app] ??= {};
      acc[event.app][event.type] ??= 0;
      acc[event.app][event.type] += 1;

      return acc;
    }, {});

    await this.mailTransporter.sendMail({
      from: this.smtpConfig.auth.user,
      to: this.smtpConfig.auth.user,
      subject: `Daily events report`,
      html: `<pre>${JSON.stringify(aggregation, null, 2)}</pre>`,
    });
  }
}
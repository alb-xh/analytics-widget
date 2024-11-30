import logger from 'loglevel';

import { BaseJob } from "./base.job.js";

export class NotifierJob extends BaseJob {
  constructor (mailTransporter) {
    super('notifier-job');

    this.mailTransporter = mailTransporter;
  }

  async run () {
    // await mailTransporter.sendMail({
    //   from: smtpConfig.auth.user,
    //   to: smtpConfig.auth.user,
    //   subject: `${collection}:document:${docId}:New view`,
    //   html: `<pre>${JSON.stringify(document.data(), null, 2)}</pre>`,
    // });

    // logger.debug(`${ctx.name}: email sent`);
  }
}
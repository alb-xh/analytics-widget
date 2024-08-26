import nodemailer from 'nodemailer';
import logger from 'loglevel';

import { HttpFn } from '../common/http-fn.js';
import { Config } from './config.js';

const config = new Config();

config.load();
logger.setLevel(config.isProd() ? 'INFO' : 'DEBUG');

const smtp = config.getSMTP();
const transporter = nodemailer.createTransport(smtp);

// Notify myself
HttpFn.create({ name: 'main', method: 'POST' }, async (req, res, ctx) => {
  // await transporter.sendMail({
  //   from: smtp.auth.user,
  //   to: smtp.auth.user,
  //   subject: '👋 Hello from Node.js 🚀',
  //   text: 'This is a test email sent from Node.js using nodemailer. 📧💻'
  // });

  console.log({
    from: smtp.auth.user,
    to: smtp.auth.user,
    subject: '👋 Hello from Node.js 🚀',
    text: 'This is a test email sent from Node.js using nodemailer. 📧💻'
  });

  logger.debug(`${ctx.name}: email sent`);
});

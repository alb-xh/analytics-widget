import nodemailer from 'nodemailer';
import logger from 'loglevel';

import { initializeApp } from 'firebase/app';
import { getFirestore, getDoc, doc } from 'firebase/firestore/lite';

import { HttpFn } from '../common/http-fn.js';
import { BadRequest, NotFound } from '../common/responses.js';
import { Config } from './config.js';

const config = new Config();

config.load();
logger.setLevel(config.isProd() ? 'INFO' : 'DEBUG');

const firebaseConfig = config.getFirebaseConfig()
const smtpConfig = config.getSmtpConfig();

const db = getFirestore(initializeApp(firebaseConfig));
const transporter = nodemailer.createTransport(smtpConfig);


// Notify myself
HttpFn.create({ name: 'main', method: 'POST' }, async (req, res, ctx) => {
  const collection = req?.body?.collection?.toString();
  const docId = req?.body?.id?.toString();

  if (!collection || !docId) {
    return new BadRequest();
  }

  const document = await getDoc(doc(db, collection, docId));

  if (!document.exists()) {
    return new NotFound();
  }

  await transporter.sendMail({
    from: smtpConfig.auth.user,
    to: smtpConfig.auth.user,
    subject: `${collection}:document:${docId}:New view`,
    text: `\`\`\`\n${JSON.stringify(document.data(), null, 2)}\n\`\`\``
  });

  logger.debug(`${ctx.name}: email sent`);
});

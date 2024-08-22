import { Config } from "./config.component";

export class Logger {
  static process (messages) {
    const stringifiedMessages = messages.map((msg) => JSON.stringify(msg))
    const msg = [ this.name, ...stringifiedMessages ].join(': ');
    return msg;
  }

  static log (...messages) {
    console.log(Logger.process(messages));
  }

  static error (...messages) {
    console.error(Logger.process(messages));
  }

  static debug (...messages) {
    if (!Config.getDebug()) {
      return;
    }

    Logger.log(...messages);
  }
}

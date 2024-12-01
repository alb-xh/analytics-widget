class Logger {
  debugMode = false;

  process (messages) {
    const stringifiedMessages = messages.map((msg) => msg instanceof Error ? msg.toString() : JSON.stringify(msg))
    const msg = stringifiedMessages.join(': ');

    return msg;
  }

  log (...messages) {
    console.log(this.process(messages));
  }

  error (...messages) {
    console.error(this.process(messages));
  }

  debug (...messages) {
    if (!this.debugMode) return;
    this.log(...messages);
  }

  enableDebug () {
    this.debugMode = true;
  }
}

export const logger = new Logger();
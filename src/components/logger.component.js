// Improve
export class Logger {
  constructor (name) {
    this.name = name;
  }

  process (messages) {
    const stringifiedMessages = messages.map((msg) => JSON.stringify(msg))
    const msg = [ this.name, ...stringifiedMessages ].join(': ');
    return msg;
  }

  log (...messages) {
    console.log(process(messages));
  }

  error (...messages) {
    console.error(process(messages));
  }
}

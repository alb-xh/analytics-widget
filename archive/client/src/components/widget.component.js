import { Logger } from "./logger.component";

export class Widget {
  constructor (dispatcher) {
    this.dispatcher = dispatcher;
  }

  install () {
    Logger.debug('Widget', 'installation started');

    window.document.addEventListener("DOMContentLoaded", async () => {
      Logger.debug('Widget', 'DOMContentLoaded', 'fired');

      await this.dispatcher.sendViewEvent();
    });
  }
}
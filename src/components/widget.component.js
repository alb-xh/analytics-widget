export class Widget {
  constructor (dispatcher) {
    this.dispatcher = dispatcher;
  }

  install (window) {
    window.document.addEventListener("DOMContentLoaded", async () => {
      await this.dispatcher.sendViewEvent();
    });
  }
}
export class Widget {
  constructor (dispatcher) {
    this.dispatcher = dispatcher;
  }

  install (window) {
    window.document.addEventListener("DOMContentLoaded", async function () {
      await this.dispatcher.sendViewEvent();
    });
  }
}
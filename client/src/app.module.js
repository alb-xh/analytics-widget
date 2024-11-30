import { Config } from "./components/config.component";
import { Logger } from "./components/logger.component";
import { Dispatcher } from "./components/dispatcher.component";
import { Widget } from "./components/widget.component";

export class AppModule {
  constructor () {
    Config.validate();

    const dispatcher = new Dispatcher(db, dataResolver);
    const widget = new Widget(dispatcher);

    this.providers = [ dispatcher, widget ];
    this.providersMap = new Map(this.providers.map((p) => [ p.constructor.name.toLowerCase(), p ]));

    Logger.debug('AppModule', 'initiated');
  }

  get (name) {
    const provider = this.providersMap.get(name.toLowerCase());

    if (!provider) {
      throw new Error(`Component not found: ${name}`);
    }

    return provider;
  }
}


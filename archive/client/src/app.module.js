import { Config } from "./components/config.component";
import { Dispatcher } from "./components/dispatcher.component";
import { Firebase } from "./components/firebase.component";
import { Notify } from "./components/notify.component";
import { Logger } from "./components/logger.component";
import { Widget } from "./components/widget.component";
import { DataResolver } from "./components/data-resolvers";
import { Db } from "./db";

export class AppModule {
  constructor () {
    Config.validate();

    const firebase = new Firebase();
    const notify = new Notify();
    const db = new Db(firebase, notify);

    const dataResolver = new DataResolver();
    const dispatcher = new Dispatcher(db, dataResolver);
    const widget = new Widget(dispatcher);

    this.providers = [ firebase, notify, db, dataResolver, dispatcher, widget ];
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


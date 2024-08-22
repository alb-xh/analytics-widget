import { Config } from "./components/config.component";
import { Dispatcher } from "./components/dispatcher.component";
import { Firebase } from "./components/firebase.component";
import { IpFetcher } from "./components/ip-fetcher.component";
import { Widget } from "./components/widget.component";
import { Db } from "./db";

export class AppModule {
  constructor (env) {
    const config = new Config(env);
    const firebase = new Firebase(config.getFirebaseConfig());
    const db = new Db(firebase);
    const ipFetcher = new IpFetcher(config.getIpApiUrl());
    const dispatcher = new Dispatcher(db, ipFetcher);
    const widget = new Widget(dispatcher);

    this.providers = [ config, firebase, db, ipFetcher, dispatcher, widget ];
    this.providersMap = new Map(this.providers.map((p) => [ p.constructor.name.toLowerCase(), p ]));
  }

  get (name) {
    const provider = this.providersMap.get(name.toLowerCase());

    if (!provider) {
      throw new Error(`Component not found: ${name}`);
    }

    return provider;
  }
}


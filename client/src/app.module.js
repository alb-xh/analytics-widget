import { Config } from "./components/config.component";
import { Dispatcher } from "./components/dispatcher.component";
import { FingerPrint } from "./components/fingerprint.component";
import { Firebase } from "./components/firebase.component";
import { GeoLookup } from "./components/geo-lookup.component";
import { IpFetcher } from "./components/ip-fetcher.component";
import { Notify } from "./components/notify.component";
import { Logger } from "./components/logger.component";
import { Widget } from "./components/widget.component";
import { Db } from "./db";

export class AppModule {
  constructor () {
    Config.validate();

    const ipFetcher = new IpFetcher(Config.getIpApiUrl());
    const geoLookup = new GeoLookup(Config.getGeoApiUrl());
    const notify = new Notify(Config.getNotifyApiUrl());
    const fingerprint = new FingerPrint();
    const firebase = new Firebase(Config.getFirebaseConfig());
    const db = new Db(firebase, notify);
    const dispatcher = new Dispatcher(db, fingerprint, ipFetcher, geoLookup);
    const widget = new Widget(dispatcher);

    this.providers = [ firebase, db, fingerprint, ipFetcher, geoLookup, notify, dispatcher, widget ];
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


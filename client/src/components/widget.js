import { z } from "zod";

import { EventType, logger, Utils } from "../common/index.js";

export class Widget {
  static ConfigSchema = z.object({
    app: z.string(),
  })

  constructor (name, queue, apiClient) {
    this.name = name;
    this.queue = queue;
    this.apiClient = apiClient;
  }

  getConfiguration () {
    const scripts = Array.from(window.document.getElementsByTagName('script'));
    const script = scripts.find((s) => {
      const src = s.getAttribute('src') ?? '';
      return src.endsWith(`${this.name}.js`);
    });

    if (!script) {
      throw new Error(`Script was not found`);
    }

    const data = {};

    for (const attr of script.attributes) {
      if (attr.nodeName.startsWith('data-')) {
        data[attr.nodeName.replace('data-', '')] = attr.nodeValue;
      }
    }

    return data;
  }

  install () {
    logger.debug('Widget', 'installation started');

    const config = this.getConfiguration();

    const { success, data } = Widget.ConfigSchema.safeParse(config);

    if (!success) throw new Error(`Invalid widget configuration`);

    window.document.addEventListener("DOMContentLoaded", async () => {
      logger.debug('Widget', 'DOMContentLoaded', 'fired');

      const event = {
        app: data.app,
        type: EventType.View,
        timestamp: Utils.now(),
      };

      this.queue.push(() => this.apiClient.sendEvent(event));
    });
  }
}
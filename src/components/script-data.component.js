import { Config } from "./config.component";

export class ScriptData {
  static get () {
    const scripts = Array.from(window.document.getElementsByTagName('script'));
    const script = scripts.find((s) => {
      const src = s.getAttribute('src') ?? '';
      return src.endsWith(`${Config.getWidgetName()}.js`);
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

  static getPrefix () {
    return ScriptData.get()['prefix'];
  }
}

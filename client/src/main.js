import { Config, logger } from "./common/index.js";
import { ApiClient, Queue, Widget } from "./components/index.js";

const config = Config.load();

if (config.debug) logger.enableDebug();

const apiClient = new ApiClient(config.api.url);
const eventQueue = new Queue('event-queue');
const widget = new Widget(config.widget.name, eventQueue, apiClient);

widget.install();

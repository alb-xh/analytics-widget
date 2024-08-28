import { Logger } from "../logger.component";

export class UserAgentDataResolver {
  resolve (data) {
    data.userAgent = window?.navigator?.userAgent;

    Logger.debug('UserAgentDataResolver', 'userAgent', data.userAgent);
  }
}
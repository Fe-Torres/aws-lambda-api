import {
  IAnalyticsParams,
  IWebsiteAccess,
} from '../../model/website/interfaces/IWebsiteAccess';
import axios from 'axios';
import { AnalyticsRequestFactory } from './helper/AnalyticsRequestFactory';
import { IWebsiteResponse } from '../../model/website/interfaces/IWebsiteResponse';
import { BaseApplicationError } from '../../main/errors/baseApplicationError';
import { StatusCode } from '../api/helper/enum';
import { ActionLog, Logger } from '../../main/logs/Loger';

export class SimpleAnalytics implements IWebsiteAccess {
  async countWebsiteAccess(
    urlToAnalyse: string,
    params?: IAnalyticsParams
  ): Promise<IWebsiteResponse> {
    try {
      Logger.processMessage(
        `SimpleAnalytics: ${this.countWebsiteAccess.name}`,
        ActionLog.INITIAL
      );

      const analyticsRequestFactory = new AnalyticsRequestFactory(params);
      const baseUrlApi = analyticsRequestFactory.buildBaseUrlApi(urlToAnalyse);
      const configRequest = analyticsRequestFactory.buildConfigRequest();
      const response = await axios.get(baseUrlApi, configRequest);
      const websiteResponse = analyticsRequestFactory.buildWebsiteResponse(
        response.data
      );
      Logger.processMessage(
        `SimpleAnalytics: ${this.countWebsiteAccess.name}`,
        ActionLog.END
      );
      return websiteResponse;
    } catch (error) {
      Logger.error(error.message);
      throw new BaseApplicationError(
        'Internal server Error',
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  async incrementWebsiteAccess(urlToAnalyse?: string) {
    try {
      Logger.processMessage(
        `SimpleAnalytics: ${this.incrementWebsiteAccess.name}`,
        ActionLog.INITIAL
      );
      const userAgent =
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.75 Safari/537.36';
      await axios.get(urlToAnalyse, { headers: { userAgent } });
      Logger.processMessage(
        `SimpleAnalytics: ${this.incrementWebsiteAccess.name}`,
        ActionLog.END
      );
      return;
    } catch (error) {
      Logger.error(error.message);
      throw new BaseApplicationError(
        'Internal server Error',
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }
}

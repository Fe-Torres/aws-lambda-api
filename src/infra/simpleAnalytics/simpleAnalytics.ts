import {
  IAnalyticsParams,
  IWebsiteAccess,
} from '../../model/website/interfaces/IWebsiteAccess';
import axios from 'axios';
import { AnalyticsRequestFactory } from './helper/AnalyticsRequest';
import { IWebsiteResponse } from './helper/IResponse';

export class SimpleAnalytics implements IWebsiteAccess {
  async countWebsiteAccess(
    urlToAnalyse: string,
    params?: IAnalyticsParams
  ): Promise<IWebsiteResponse> {
    try {
      const analyticsRequestFactory = new AnalyticsRequestFactory(params);
      const baseUrlApi = analyticsRequestFactory.buildBaseUrlApi(urlToAnalyse);
      const configRequest = analyticsRequestFactory.buildConfigRequest();
      const response = await axios.get(baseUrlApi, configRequest);
      const websiteResponse = analyticsRequestFactory.buildWebsiteResponse(
        response.data
      );
      return websiteResponse;
    } catch (error) {
      throw new Error(`Error getting analysis data: ${error.message}`);
    }
  }

  async incrementWebsiteAccess(urlToAnalyse?: string) {
    try {
      const userAgent =
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.75 Safari/537.36';
      await axios.get(urlToAnalyse, { headers: { userAgent } });
      return;
    } catch (error) {
      throw new Error(`Error when incrementing access: ${error.message}`);
    }
  }
}

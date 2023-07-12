import {
  IAnalyticsParams,
  IWebsiteAccess,
} from '../../model/website/interfaces/IWebsiteAccess';
import axios from 'axios';
import { AnalyticsRequestFactory } from './helper/AnalyticsRequestFactory';
import { IWebsiteResponse } from '../../model/website/interfaces/IWebsiteResponse';
import { BaseApplicationError } from '../../main/errors/baseApplicationError';
import { StatusCode } from '../api/helper/enum';

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
      console.error(error.message);
      throw new BaseApplicationError('Internal server Error', StatusCode.INTERNAL_SERVER_ERROR);
    }
  }

  async incrementWebsiteAccess(urlToAnalyse?: string) {
    try {
      const userAgent =
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.75 Safari/537.36';
      await axios.get(urlToAnalyse, { headers: { userAgent } });
      return;
    } catch (error) {
      console.error(error.message);
      throw new BaseApplicationError('Internal server Error', StatusCode.INTERNAL_SERVER_ERROR);
    }
  }
}

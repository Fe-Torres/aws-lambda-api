import { IWebsiteResponse } from '../../../infra/simpleAnalytics/helper/IResponse';

export interface IAnalyticsParams {
  fields?: string;
  startDate?: string;
  endDate?: string;
}

export interface IWebsiteAccess {
  incrementWebsiteAccess(urlToAnalyse: string);
  countWebsiteAccess(urlToAnalyse: string, params?: IAnalyticsParams): Promise<IWebsiteResponse>;
}

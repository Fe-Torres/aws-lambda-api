import { IWebsiteDTO } from './WebsiteDto';

export interface IAnalyticsParams {
  fields?: string;
  startDate?: string;
  endDate?: string;
}

export interface IWebsiteAccess {
  incrementWebsiteAccess(url?: string);
  countWebsiteAccess(url?: string, params?: IAnalyticsParams): Promise<IWebsiteDTO>;
}

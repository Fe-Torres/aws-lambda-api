import { IAnalyticsParams } from '../../../model/website/interfaces/IWebsiteAccess';
import { IWebsiteResponse } from '../../../model/website/interfaces/IWebsiteResponse';
import { IConfigRequest } from './IConfigRequest';

export class AnalyticsRequestFactory {
  private apiVersion: string;
  private headers: object;
  private defaultFieldParam: string;
  private _params: IAnalyticsParams;

  constructor(params: IAnalyticsParams) {
    this.apiVersion = '5';
    this.headers = {
      'Content-Type': 'text/csv',
      'User-Id': process.env.SA_USER_ID,
      'Api-Key': process.env.SA_API_KEY,
    };
    this.defaultFieldParam = 'visitors,pageviews,histogram';
    this._params = params;
  }

  public buildBaseUrlApi(urlToAnalyse: string): string {
    const urlToAnalyseParsed = this.parseUrlToAnalyse(urlToAnalyse);
    const baseUrlApi = `https://simpleanalytics.com/${urlToAnalyseParsed}?version=${this.apiVersion}`;
    return baseUrlApi;
  }

  private parseFieldsParams(): void {
    if (this._params.fields) {
      this._params.fields = `${this.defaultFieldParam},${this._params.fields}`;
    } else {
      this._params.fields = this.defaultFieldParam;
    }
  }
  private parseUrlToAnalyse(urlToAnalyse: string): string {
    const parsedUrl = urlToAnalyse.replace(/^https?:\/\//i, '');
    return `${parsedUrl}.json`;
  }

  public buildConfigRequest(): IConfigRequest {
    this.parseFieldsParams();
    const configRequest: IConfigRequest = {
      headers: this.headers,
      params: {
        start: this._params.startDate,
        end: this._params.endDate,
        fields: this._params.fields,
      },
    };
    return configRequest;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public buildWebsiteResponse(data: any): IWebsiteResponse {
    const websiteResponse: IWebsiteResponse = {
      url: data?.url,
      totalVisitors: data.visitors,
      totalPageviews: data.pageviews,
      histogram: data.histogram,
      start: data.start,
      end: data.end,
      device_types: data.device_types,
      browser_names: data.browser_names,
      os_names: data.os_names,
    };

    return websiteResponse;
  }
}

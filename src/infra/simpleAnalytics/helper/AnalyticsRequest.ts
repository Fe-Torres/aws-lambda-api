import { IAnalyticsParams } from '../../../model/website/interfaces/IWebsiteAccess';
import { IWebsiteResponse } from './IResponse';

export class AnalyticsRequestBuilder {
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
    const baseUrlApi = `https://simpleanalytics.com/${urlToAnalyse}?version=${this.apiVersion}`;
    return baseUrlApi;
  }

  private parseFieldsParams(): void {
    if (this._params.fields) {
      this._params.fields = `${this.defaultFieldParam},${this._params.fields}`;
    } else {
      this._params.fields = this.defaultFieldParam;
    }
  }

  public buildConfigRequest(): object {
    this.parseFieldsParams();
    const configRequest = {
      headers: this.headers,
      params: {
        start: this._params.startDate,
        end: this._params.endDate,
        ...this._params,
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

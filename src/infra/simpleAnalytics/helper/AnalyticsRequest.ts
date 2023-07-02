import { IAnalyticsParams } from '../../../model/website/interfaces/IWebsiteAccess';

export class AnalyticsRequestBuilder {
  private apiVersion: string;
  private headers: object;
  private defaultFieldParam: string;
  private _params: IAnalyticsParams;

  constructor(params: IAnalyticsParams) {
    this.apiVersion = '5';
    this.headers = {
      'Content-Type': 'text/csv',
    };
    this.defaultFieldParam = 'histogram';
    this._params = params;
  }

  public buildBaseUrlApi(urlToAnalyse: string): string {
    const baseUrlApi = `https://simpleanalytics.com/${urlToAnalyse}?version=${this.apiVersion}`;
    return baseUrlApi;
  }

  public parseFieldsParams() {
    if (this._params.fields) {
      this._params.fields = `${this.defaultFieldParam},${this._params.fields}`;
    } else {
      this._params.fields = this.defaultFieldParam;
    }
  }

  public buildConfigRequest() {
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
}

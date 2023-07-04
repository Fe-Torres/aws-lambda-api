import { AnalyticsRequestFactory } from '../helper/AnalyticsRequest';

describe('AnalyticsRequestFactory', () => {
  const params = {
    fields: 'new_field',
    startDate: '2023-01-01',
    endDate: '2023-01-31',
  };
  const factory = new AnalyticsRequestFactory(params);

  test('should build base URL API correctly', () => {
    const urlToAnalyse = 'https://www.example.com';
    const baseUrlApi = factory.buildBaseUrlApi(urlToAnalyse);
    expect(baseUrlApi).toBe(
      'https://simpleanalytics.com/www.example.com.json?version=5'
    );
  });

  test('should build config request correctly', () => {
    const configRequest = factory.buildConfigRequest();
    expect(configRequest.params.start).toEqual('2023-01-01');
    expect(configRequest.params.end).toEqual('2023-01-31');
    expect(configRequest.params.fields).toEqual(
      'visitors,pageviews,histogram,new_field'
    );
  });

  test('should build website response correctly', () => {
    const responseData = {
      url: 'https://www.example.com',
      visitors: 1000,
      pageviews: 2000,
      start: '2023-01-01',
      end: '2023-01-31',
    };

    const websiteResponse = factory.buildWebsiteResponse(responseData);

    expect(websiteResponse).toEqual({
      url: 'https://www.example.com',
      totalVisitors: 1000,
      totalPageviews: 2000,
      start: '2023-01-01',
      end: '2023-01-31',
    });
  });
});

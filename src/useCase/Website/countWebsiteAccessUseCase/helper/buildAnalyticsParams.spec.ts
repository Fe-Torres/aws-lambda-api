import { IAnalyticsParams } from '../../../../model/website/interfaces/IWebsiteAccess';
import { AnalyticsParamsBuilder } from './buildAnalyticsParams';

describe('AnalyticsParamsBuilder', () => {
  let builder: AnalyticsParamsBuilder;

  beforeEach(() => {
    builder = new AnalyticsParamsBuilder();
  });

  test('should build analytics params with fields', () => {
    const fields = 'visitors,pageviews';

    const result: IAnalyticsParams = builder.withFields(fields).build();

    expect(result).toEqual({ fields });
  });

  test('should build analytics params with start date', () => {
    const startDate = '2023-07-01';

    const result: IAnalyticsParams = builder.withStartDate(startDate).build();

    expect(result).toEqual({ startDate });
  });

  test('should build analytics params with end date', () => {
    const endDate = '2023-07-31';

    const result: IAnalyticsParams = builder.withEndDate(endDate).build();

    expect(result).toEqual({ endDate });
  });

  test('should build analytics params with fields, start date, and end date', () => {
    const fields = 'visitors,pageviews';
    const startDate = '2023-07-01';
    const endDate = '2023-07-31';

    const result: IAnalyticsParams = builder
      .withFields(fields)
      .withStartDate(startDate)
      .withEndDate(endDate)
      .build();

    expect(result).toEqual({ fields, startDate, endDate });
  });

  test('should not include invalid start date', () => {
    const startDate = '2023/07/01';

    const result: IAnalyticsParams = builder.withStartDate(startDate).build();

    expect(result).toEqual({});
  });

  test('should not include invalid end date', () => {
    const endDate = '2023/07/31';

    const result: IAnalyticsParams = builder.withEndDate(endDate).build();

    expect(result).toEqual({});
  });
});

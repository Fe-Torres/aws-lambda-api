import { IAnalyticsParams } from '../../../../model/website/interfaces/IWebsiteAccess';

export class AnalyticsParamsBuilder {
  private analyticsParams: IAnalyticsParams;

  constructor() {
    this.analyticsParams = {};
  }

  public withFields(fields: string): AnalyticsParamsBuilder {
    this.analyticsParams.fields = fields;
    return this;
  }

  public withStartDate(startDate: string): AnalyticsParamsBuilder {
    if (this.isValidDate(startDate)) {
      this.analyticsParams.startDate = startDate;
    }
    return this;
  }

  public withEndDate(endDate: string): AnalyticsParamsBuilder {
    if (this.isValidDate(endDate)) {
      this.analyticsParams.endDate = endDate;
    }
    return this;
  }

  private isValidDate(dateStr: string): boolean {
    // Verificar se a data está no formato "YYYY-MM-DD" ou "DD-MM-YYYY"
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (dateRegex.test(dateStr)) {
      return true;
    }
    return false;
  }

  public build(): IAnalyticsParams {
    return this.analyticsParams;
  }
}

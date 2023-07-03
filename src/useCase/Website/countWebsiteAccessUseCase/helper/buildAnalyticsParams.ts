import { IAnalyticsParams } from '../../../../model/website/interfaces/IWebsiteAccess';
import { IWebsiteDTO } from '../../../../model/website/interfaces/WebsiteDto';

export class AnalyticsParamsBuilder {
  static build(queryParams: IWebsiteDTO): IAnalyticsParams {

    if (queryParams.startDate) {
      this.isValidDate(queryParams.startDate);
    }

    if (queryParams.endDate) {
      this.isValidDate(queryParams.endDate);
    }

    return queryParams;

  }

  private static isValidDate(dateStr: string): boolean {
    // Verificar se a data está no formato "YYYY-MM-DD" ou "DD-MM-YYYY"
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (dateRegex.test(dateStr)) {
      return true;
    }

    return false;
  }


}

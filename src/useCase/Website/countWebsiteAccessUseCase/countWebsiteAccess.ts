import { IWebsiteResponse } from '../../../model/website/interfaces/IWebsiteResponse';
import { Website } from '../../../model/website/Website';
import {
  IAnalyticsParams,
  IWebsiteAccess,
} from '../../../model/website/interfaces/IWebsiteAccess';
import { IWebsiteDTO } from '../../../model/website/interfaces/WebsiteDto';
import { AnalyticsParamsBuilder } from './helper/buildAnalyticsParams';
import { ActionLog, Logger } from '../../../main/logs/Loger';

export class CountWebsiteAccessUseCase {
  private className: string;
  constructor(private websiteAccess: IWebsiteAccess) {
    this.className = 'CountWebsiteAccessUseCase';
  }

  async execute(websiteDto: IWebsiteDTO): Promise<IWebsiteResponse> {
    Logger.processMessage(this.className, ActionLog.INITIAL);
    const website = new Website(websiteDto.url);
    const analyticsParams = this.buildAnalyticsParams(websiteDto);
    const webSiteData = await this.websiteAccess.countWebsiteAccess(
      website.url,
      analyticsParams
    );
    Logger.processMessage(this.className, ActionLog.END);
    return webSiteData;
  }

  private buildAnalyticsParams(websiteDto: IWebsiteDTO): IAnalyticsParams {
    const builder = new AnalyticsParamsBuilder();
    const analyticsParams = builder
      .withStartDate(websiteDto.startDate)
      .withEndDate(websiteDto.endDate)
      .withFields(websiteDto.fields)
      .build();
    return analyticsParams;
  }
}

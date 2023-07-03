import { IWebsiteResponse } from '../../../infra/simpleAnalytics/helper/IResponse';
import { Website } from '../../../model/website/Website';
import {
  IAnalyticsParams,
  IWebsiteAccess,
} from '../../../model/website/interfaces/IWebsiteAccess';
import { IWebsiteDTO } from '../../../model/website/interfaces/WebsiteDto';
import { AnalyticsParamsBuilder } from './helper/buildAnalyticsParams';

export class CountWebsiteAccessUseCase {
  constructor(private websiteAccess: IWebsiteAccess) {}

  async execute(websiteDto: IWebsiteDTO): Promise<IWebsiteResponse> {
    const website = new Website(websiteDto.url);
    const analyticsParams = this.buildAnalyticsParams(websiteDto);
    const webSiteData = await this.websiteAccess.countWebsiteAccess(
      website.url,
      analyticsParams
    );
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

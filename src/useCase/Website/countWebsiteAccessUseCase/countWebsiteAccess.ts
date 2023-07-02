import { Website } from '../../../model/website/Website';
import { IWebsiteAccess } from '../../../model/website/interfaces/IWebsiteAccess';
import { IWebsiteDTO } from '../../../model/website/interfaces/WebsiteDto';
import { AnalyticsParamsBuilder } from './helper/buildAnalyticsParams';

export class CountWebsiteAccessUseCase {
  constructor(private websiteAccess: IWebsiteAccess) { }

  async execute(WebsiteQueryParams: IWebsiteDTO): Promise<IWebsiteDTO> {
    const website = new Website(WebsiteQueryParams.url);
    const analyticsParams = AnalyticsParamsBuilder.build(WebsiteQueryParams);
    const webSiteData = await this.websiteAccess.countWebsiteAccess(
      website.url, analyticsParams
    );
    return webSiteData;
  }
}

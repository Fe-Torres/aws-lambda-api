import { BadRequestApplicationError } from '../../main/errors/badRequestError';
import { NotFoundApplicationError } from '../../main/errors/notFoundError';
import { IWebsiteAccess } from '../../model/website/interfaces/IWebsiteAccess';
import { IWebsiteResponse } from '../../model/website/interfaces/IWebsiteResponse';

export class CountApiMock implements IWebsiteAccess {
  private listWebsiteData: IWebsiteResponse[] = [
    {
      url: 'https://www.ton.com.br',
      totalPageviews: 2000,
      totalVisitors: 1000,
    },
    {
      url: 'https://www.google.com.br',
      totalPageviews: 500,
      totalVisitors: 100,
    },
    {
      url: 'https://www.facebook.com.br',
      totalPageviews: 3000,
      totalVisitors: 1000,
    },
  ];

  public async incrementWebsiteAccess(
    urlToAnalyse: string
  ): Promise<IWebsiteResponse> {
    const website = this.findWebsite(urlToAnalyse);
    website.totalVisitors++;
    return website;
  }

  public async countWebsiteAccess(url?: string): Promise<IWebsiteResponse> {
    const website = this.findWebsite(url);
    return website;
  }

  private findWebsite(url): IWebsiteResponse {
    if (!url) {
      throw new BadRequestApplicationError('URL is required');
    }

    const website = this.listWebsiteData.find((w) => w.url === url);

    if (!website) {
      throw new NotFoundApplicationError('Website');
    }

    return website;
  }
}

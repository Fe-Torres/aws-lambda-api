import { IWebsiteAccess } from '../../model/website/interfaces/IWebsiteAccess';
import { IWebsiteDTO } from '../../model/website/interfaces/WebsiteDto';

export class CountApiMock implements IWebsiteAccess {
  private listWebsiteData: IWebsiteDTO[] = [
    { url: 'https://www.ton.com.br', accessNumber: 1000 },
    { url: 'https://www.google.com.br', accessNumber: 1010 },
    { url: 'https://www.facebook.com.br', accessNumber: 1020 },
  ];

  public async incrementWebsiteAccess(url?: string): Promise<IWebsiteDTO> {
    const website = this.findWebsite(url);
    website.accessNumber++;
    return website;
  }

  public async countWebsiteAccess(url?: string): Promise<IWebsiteDTO> {
    const website = this.findWebsite(url);
    return website;
  }

  private findWebsite(url?: string): IWebsiteDTO {
    if (!url) {
      throw new Error('URL is required');
    }

    const website = this.listWebsiteData.find((w) => w.url === url);

    if (!website) {
      throw new Error('Website not found');
    }

    return website;
  }
}

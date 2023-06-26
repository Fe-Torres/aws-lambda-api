import { IWebsiteAccess } from '../../model/website/interfaces/IWebsiteAccess';
import { IWebsiteDTO } from '../../model/website/interfaces/WebsiteDto';

export class CountApiMock implements IWebsiteAccess {
  private listWebsiteData: IWebsiteDTO[] = [
    { url: 'www.ton.com.br', accesNumber: 1000 },
    { url: 'www.google.com.br', accesNumber: 1010 },
    { url: 'www.facebook.com.br', accesNumber: 1020 },
  ];

  public async incrementWebsiteAccess(url?: string): Promise<IWebsiteDTO> {
    const website = this.findWebsite(url);
    website.accesNumber++;
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

import { Website } from "../../../model/website/Website";
import { IWebsiteAccess } from "../../../model/website/interfaces/IWebsiteAccess";
import { IWebsiteDTO } from "../../../model/website/interfaces/WebsiteDto";


export class CountWebsiteAccessUseCase {
  constructor(private websiteAccess: IWebsiteAccess) { }

  async execute(url: string): Promise<IWebsiteDTO> {
    const website = new Website(url)
    const webSiteData = await this.websiteAccess.countWebsiteAccess(website.url)
    return webSiteData
  }


}


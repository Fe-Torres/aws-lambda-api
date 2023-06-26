import { IWebsiteDTO } from "./WebsiteDto";

export interface IWebsiteAccess {
  incrementWebsiteAccess(url?: string): Promise<IWebsiteDTO>
  countWebsiteAccess(url?: string): Promise<IWebsiteDTO>
}
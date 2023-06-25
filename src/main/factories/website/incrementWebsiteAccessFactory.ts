import { CountApiMock } from "../../../infra/countApiMock/countApiMock";
import { IncrementWebsiteAccessUseCase } from "../../../useCase/Website/incrementWebsiteAccessUseCase/incrementWebsiteAccess";



export const makeIncrementWebsiteAccessUseCase = () => {
  const webSiteAccessApi = new CountApiMock()
  const incrementWebsiteUseCase = new IncrementWebsiteAccessUseCase(webSiteAccessApi)
  return incrementWebsiteUseCase;
};

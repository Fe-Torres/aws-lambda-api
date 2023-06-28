import { CountApiMock } from '../../../infra/countApiMock/countApiMock';
import { CountWebsiteAccessUseCase } from '../../../useCase/Website/countWebsiteAccessUseCase/countWebsiteAccess';

export const makeCountWebsiteAccessUseCase = () => {
  const webSiteAccessApi = new CountApiMock();
  const countWebsiteUseCase = new CountWebsiteAccessUseCase(webSiteAccessApi);
  return countWebsiteUseCase;
};

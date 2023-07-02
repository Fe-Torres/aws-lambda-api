import { SimpleAnalytics } from '../../../infra/simpleAnalytics/simpleAnalytics';
import { CountWebsiteAccessUseCase } from '../../../useCase/Website/countWebsiteAccessUseCase/countWebsiteAccess';

export const makeCountWebsiteAccessUseCase = () => {
  const webSiteAccessApi = new SimpleAnalytics();
  const countWebsiteUseCase = new CountWebsiteAccessUseCase(webSiteAccessApi);
  return countWebsiteUseCase;
};

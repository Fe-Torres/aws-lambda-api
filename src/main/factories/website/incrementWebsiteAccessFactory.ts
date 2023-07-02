import { SimpleAnalytics } from '../../../infra/simpleAnalytics/simpleAnalytics';
import { IncrementWebsiteAccessUseCase } from '../../../useCase/Website/incrementWebsiteAccessUseCase/incrementWebsiteAccess';

export const makeIncrementWebsiteAccessUseCase = () => {
  const webSiteAccessApi = new SimpleAnalytics();
  const incrementWebsiteUseCase = new IncrementWebsiteAccessUseCase(
    webSiteAccessApi
  );
  return incrementWebsiteUseCase;
};

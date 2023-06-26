import { CountApiMock } from '../../../infra/countApiMock/countApiMock';
import { IWebsiteAccess } from '../../../model/website/interfaces/IWebsiteAccess';
import { CountWebsiteAccessUseCase } from './countWebsiteAccess';

describe('CountWebsiteAccessUseCase', () => {
  let mockWebsiteAccess: IWebsiteAccess;

  beforeEach(() => {
    mockWebsiteAccess = new CountApiMock();
  });

  test('should return website data with access count', async () => {
    const websiteUrl = 'https://www.ton.com.br';
    const expectedWebsiteData = {
      url: websiteUrl,
      accesNumber: 1000,
    };
    const useCase = new CountWebsiteAccessUseCase(mockWebsiteAccess);
    const result = await useCase.execute(websiteUrl);
    expect(result).toEqual(expectedWebsiteData);
  });
});

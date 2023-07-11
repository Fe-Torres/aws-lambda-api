import { CountApiMock } from '../../../infra/countApiMock/countApiMock';
import { InvalidDataError } from '../../../main/errors/invalidDataError';
import { IWebsiteAccess } from '../../../model/website/interfaces/IWebsiteAccess';
import { CountWebsiteAccessUseCase } from './countWebsiteAccess';

describe('CountWebsiteAccessUseCase', () => {
  let mockWebsiteAccess: IWebsiteAccess;

  beforeEach(() => {
    mockWebsiteAccess = new CountApiMock();
  });

  test('should return website data with access count for a valid URL', async () => {
    const websiteDto = {
      url: 'https://www.ton.com.br',
    };
    const expectedWebsiteData = {
      url: websiteDto.url,
      totalPageviews: 2000,
      totalVisitors: 1000,
    };

    const useCase = new CountWebsiteAccessUseCase(mockWebsiteAccess);
    const result = await useCase.execute(websiteDto);

    expect(result).toEqual(expectedWebsiteData);
  });

  test('should throw an error for an invalid URL', async () => {
    const invalidWebsiteDto = {
      url: 'invalid-url',
    };

    const useCase = new CountWebsiteAccessUseCase(mockWebsiteAccess);

    await expect(useCase.execute(invalidWebsiteDto)).rejects.toThrowError(
      new InvalidDataError('Website')
    );
  });
});

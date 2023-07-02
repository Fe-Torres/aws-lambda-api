// import { CountApiMock } from '../../../infra/countApiMock/countApiMock';
// import { IWebsiteAccess } from '../../../model/website/interfaces/IWebsiteAccess';
// import { CountWebsiteAccessUseCase } from './countWebsiteAccess';

// describe('CountWebsiteAccessUseCase', () => {
//   let mockWebsiteAccess: IWebsiteAccess;

//   beforeEach(() => {
//     mockWebsiteAccess = new CountApiMock();
//   });

//   test('should return website data with access count for a valid URL', async () => {
//     const websiteUrl = 'https://www.ton.com.br';
//     const expectedWebsiteData = {
//       url: websiteUrl,
//       accessNumber: 1000,
//     };

//     const useCase = new CountWebsiteAccessUseCase(mockWebsiteAccess);
//     const result = await useCase.execute(websiteUrl);

//     expect(result).toEqual(expectedWebsiteData);
//   });

//   test('should throw an error for an invalid URL', async () => {
//     const invalidUrl = 'invalid-url';

//     const useCase = new CountWebsiteAccessUseCase(mockWebsiteAccess);

//     await expect(useCase.execute(invalidUrl)).rejects.toThrow(Error);
//   });
// });

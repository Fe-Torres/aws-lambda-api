import { InvalidDataError } from '../../main/errors/invalidDataError';
import { Website } from './Website';

describe('Website', () => {
  test.each([
    ['https://www.example.com'],
    ['http://www.example.com'],
    ['https://www.example.com/path/to/page'],
    ['https://www.example.com/?param1=value1&param2=value2'],
  ])(
    'should create a new Website instance with a valid URL: %s',
    (validUrl) => {
      // Act
      const website = new Website(validUrl);

      // Assert
      expect(website).toBeInstanceOf(Website);
      expect(website.url).toBe(validUrl);
    }
  );

  test.each([
    ['www.example.com'],
    ['example.com'],
    ['example'],
    ['ftp://www.example.com'],
  ])('should throw an error for an invalid URL: %s', (invalidUrl) => {
    // Assert
    expect(() => {
      // Act
      new Website(invalidUrl);
    }).toThrowError(new InvalidDataError('Website'));
  });
});

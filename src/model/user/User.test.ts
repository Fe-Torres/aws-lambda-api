import { InvalidDataError } from '../../main/errors/invalidDataError';
import { User } from './User';

describe('User', () => {
  test('should create a new User instance with valid input', () => {
    // Arrange
    const validId = '1';
    const validName = 'Torres Tester';
    const validAge = 25;
    const validEmail = 'tt@example.com';

    // Act
    const user = new User(validId, validName, validAge, validEmail);

    // Assert
    expect(user).toBeInstanceOf(User);
    expect(user.id).toBe(validId);
    expect(user.name).toBe(validName);
    expect(user.age).toBe(validAge);
    expect(user.email).toBe(validEmail);
  });

  test('should throw an error with invalid input', () => {
    // Arrange
    const invalidId = '';
    const invalidName = '';
    const invalidAge = -5;
    const invalidEmail = 'invalidemail';

    expect(
      () => new User(invalidId, 'Torres Tester', 25, 'tt@example.com')
    ).toThrowError(new InvalidDataError('User'));

    expect(() => new User('1', invalidName, 25, 'tt@example.com')).toThrowError(
      new InvalidDataError('User')
    );

    expect(
      () => new User('1', 'Torres Tester', invalidAge, 'tt@example.com')
    ).toThrowError(new InvalidDataError('User'));

    expect(() => new User('1', 'Torres Tester', 25, invalidEmail)).toThrowError(
      new InvalidDataError('User')
    );
  });
});

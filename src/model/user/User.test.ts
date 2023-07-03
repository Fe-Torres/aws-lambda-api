import { User } from './User';

describe('User', () => {
  test('should create a new User instance with valid input', () => {
    // Arrange
    const validId = '1';
    const validName = 'John Doe';
    const validAge = 25;
    const validEmail = 'johndoe@example.com';

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
      () => new User(invalidId, 'John Doe', 25, 'johndoe@example.com')
    ).toThrow(Error);
    expect(() => new User('1', invalidName, 25, 'johndoe@example.com')).toThrow(
      Error
    );
    expect(
      () => new User('1', 'John Doe', invalidAge, 'johndoe@example.com')
    ).toThrow(Error);
    expect(() => new User('1', 'John Doe', 25, invalidEmail)).toThrow(Error);
  });
});

import {
  mockFindUserUseCaseByEmail,
  mockUserRepository,
} from './Mock/UserMocks';
import { CreateUserUseCase } from '../createUserUsecase/createUser';
import { ConflictApplicationError } from '../../../main/errors/conflictError';

describe('CreateUserUseCase', () => {
  let createUserUseCase: CreateUserUseCase;

  beforeEach(() => {
    createUserUseCase = new CreateUserUseCase(
      mockUserRepository,
      mockFindUserUseCaseByEmail
    );
  });

  test('should create a new user', async () => {
    const userData = {
      name: 'Torres Tester',
      age: 25,
      email: 'tt@example.com',
    };

    const result = await createUserUseCase.execute(userData);

    expect(result).toHaveProperty('id');
    expect(result.name).toBe(userData.name);
    expect(result.age).toBe(userData.age);
    expect(result.email).toBe(userData.email);
  });

  test('should throw an error when user email already exists', async () => {
    const userData = {
      name: 'Torres Tester',
      age: 25,
      email: 'apenasfotografo@gmail.com',
    };

    await expect(createUserUseCase.execute(userData)).rejects.toThrowError(
      new ConflictApplicationError('Email already exists')
    );
  });
});

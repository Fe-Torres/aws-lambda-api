import {
  mockFindUserUseCaseByEmail,
  mockUserRepository,
} from '../../helper/UserMocks';
import { CreateUserUseCase } from '../createUserUsecase/createUser';

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
      name: 'John Doe',
      age: 25,
      email: 'johndoe@example.com',
    };

    const result = await createUserUseCase.execute(userData);

    expect(result).toHaveProperty('id');
    expect(result.name).toBe(userData.name);
    expect(result.age).toBe(userData.age);
    expect(result.email).toBe(userData.email);
  });

  test('should throw an error when user already exists', async () => {
    const userData = {
      name: 'John Doe',
      age: 25,
      email: 'apenasfotografo@gmail.com',
    };

    await expect(createUserUseCase.execute(userData)).rejects.toThrow(Error);
  });
});

import { UserDTO } from 'src/model/user/interfaces/userDto';
import { User } from 'src/model/user/User';
import { UserRepositoryInMemory } from '../../../infra/repository/inMemory/UserRepositoryInMemory';
import { CreateUserUseCase } from './createUser';

describe('CreateUserUseCase', () => {
  // let createUserUseCase: CreateUserUseCase;
  // let userRepository: UserRepositoryInMemory;

  beforeEach(() => {
    // Create a new instance of the UserRepositoryMock for each test
  });

  it.todo('should create a new user', async () => {
    // Arrange
    const userData: UserDTO = {
      name: 'John Doe',
      age: 25,
      email: 'john@example.com',
    };
    const userRepository = new UserRepositoryInMemory();
    const createUserUseCase = new CreateUserUseCase(userRepository);
    // Act
    const createdUser = await createUserUseCase.execute(userData);

    // Assert
    expect(createdUser).toBeInstanceOf(User);
    expect(createdUser.name).toBe(userData.name);
    expect(createdUser.age).toBe(userData.age);
    expect(createdUser.email).toBe(userData.email);
  });
});

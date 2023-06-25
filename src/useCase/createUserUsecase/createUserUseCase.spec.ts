import { UserDTO } from 'src/model/user/interfaces/userDto';
import { CreateUserUseCase } from './createUserUseCase';
import { UserRepositoryInMemory } from 'src/infra/repository/inMemory/UserRepositoryInMemory';
import { IUserRepository } from 'src/model/user/interfaces/IUserRepository';


describe('CreateUserUseCase', () => {
  let userRepository: IUserRepository;
  let createUserUseCase: CreateUserUseCase;

  beforeEach(() => {
    userRepository = new UserRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(userRepository);
  });

  test('should create a new user', async () => {
    // Arrange
    const userData: UserDTO = {
      name: 'John Doe',
      age: 25,
      email: 'johndoe@example.com',
    };

    // Act
    const createdUser = await createUserUseCase.execute(userData);

    // Assert
    expect(createdUser.id).toBeDefined();
    expect(createdUser.name).toBe(userData.name);
    expect(createdUser.age).toBe(userData.age);
    expect(createdUser.email).toBe(userData.email);
  });

  // Add more test cases as needed

});

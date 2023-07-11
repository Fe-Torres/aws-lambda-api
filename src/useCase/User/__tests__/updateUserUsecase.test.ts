import {
  mockUserRepository,
  mockFindUserUseCaseByEmail,
  mockFindUserByIdUseCase,
} from './Mock/UserMocks';
import { UpdateUserUseCase } from '../updateUserUsecase/updateUser';

describe('UpdateUserUseCase', () => {
  let updateUserUseCase: UpdateUserUseCase;

  beforeEach(() => {
    updateUserUseCase = new UpdateUserUseCase(
      mockUserRepository,
      mockFindUserUseCaseByEmail,
      mockFindUserByIdUseCase
    );
  });

  test('should update a user', async () => {
    const userId = '123';
    const userData = {
      name: 'Updated Name',
      age: 30,
      email: 'updated@example.com',
    };

    const mockUpdatedUser = {
      id: userId,
      name: userData.name,
      age: userData.age,
      email: userData.email,
    };

    const result = await updateUserUseCase.execute(userId, userData);

    expect(result).toEqual(mockUpdatedUser);
  });

  test('should throw an error when user does not exist', async () => {
    const userId = 'nonExistingUser';
    const userData = {
      name: 'Updated Name',
      age: 30,
      email: 'updated@example.com',
    };

    await expect(updateUserUseCase.execute(userId, userData)).rejects.toThrow(
      Error
    );
  });

  test('should throw an error when new email is already in use', async () => {
    const userId = '3210';
    const userData = {
      name: 'Updated Name',
      age: 30,
      email: 'ruivotorres@gmail.com',
    };

    await expect(
      updateUserUseCase.execute(userId, userData)
    ).rejects.toThrowError('Email already exists');
  });
});

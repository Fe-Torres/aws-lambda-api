import { UserRepositoryInMemory } from '../../../infra/repositoryInMemory/UserRepositoryInMemory';
import { IUserRepository } from '../../../model/user/interfaces/IUserRepository';
import { IFindUserByIdUseCase } from '../../../model/user/interfaces/IUserUseCase';
import { mockUserRepository } from '../../helper/UserMocks';
import { DeleteUserByIdUseCase } from '../deleteUserByIdUsecase/deleteUserById';
import { FindUserByIdUseCase } from '../findUserByIdUsecase/findUserById';

describe('DeleteUserByIdUseCase', () => {
  let deleteUserByIdUseCase: DeleteUserByIdUseCase;
  let mockUserRepositoryInstance: IUserRepository;
  let mockFindUserByIdUseCaseInstance: IFindUserByIdUseCase;

  beforeEach(() => {
    mockUserRepositoryInstance = new UserRepositoryInMemory();
    mockFindUserByIdUseCaseInstance = new FindUserByIdUseCase(
      mockUserRepository
    );
    deleteUserByIdUseCase = new DeleteUserByIdUseCase(
      mockUserRepositoryInstance,
      mockFindUserByIdUseCaseInstance
    );
  });

  test('should delete a user by ID', async () => {
    const userId = '123';

    await expect(
      deleteUserByIdUseCase.execute(userId)
    ).resolves.toBeUndefined();
  });

  test('should throw an error when user does not exist', async () => {
    const userId = 'nonExistingUser';

    await expect(deleteUserByIdUseCase.execute(userId)).rejects.toThrowError(
      'User not found'
    );
  });
});

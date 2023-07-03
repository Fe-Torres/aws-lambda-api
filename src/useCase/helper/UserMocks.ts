import { UserRepositoryInMemory } from '../../infra/repositoryInMemory/UserRepositoryInMemory';
import { FindUserByEmailUseCase } from '../User/findUserByEmailUsecase/findUserByEmail';
import { FindUserByIdUseCase } from '../User/findUserByIdUsecase/findUserById';

export const mockUserRepository = new UserRepositoryInMemory();
export const mockFindUserUseCaseByEmail = new FindUserByEmailUseCase(
  mockUserRepository
);
export const mockFindUserByIdUseCase = new FindUserByIdUseCase(
  mockUserRepository
);

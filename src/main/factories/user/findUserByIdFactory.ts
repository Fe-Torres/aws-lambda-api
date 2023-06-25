import { UserRepositoryInMemory } from "../../infra/repository/inMemory/UserRepositoryInMemory";
import { FindUserByIdUseCase } from "../../useCase/findUserByIdUsecase/findUserById";



export const makeFindUserByIdUseCase = () => {
  const userRepository = new UserRepositoryInMemory()
  const findUserByIdUseCase = new FindUserByIdUseCase(userRepository)
  return findUserByIdUseCase;
};

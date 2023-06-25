import { UserRepositoryInMemory } from "src/infra/repository/inMemory/UserRepositoryInMemory";
import { CreateUserUseCase } from "src/useCase/userUsecase/createUserUseCase";


export const makeUserUseCase = () => {
  const userRepository = new UserRepositoryInMemory()
  const userUseCase = new CreateUserUseCase(userRepository)
  return userUseCase;
};

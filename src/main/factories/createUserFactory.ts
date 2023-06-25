import { UserRepositoryInMemory } from "../../infra/repository/inMemory/UserRepositoryInMemory";
import { CreateUserUseCase } from "../../useCase/createUserUsecase/createUser";



export const makeUserUseCase = () => {
  const userRepository = new UserRepositoryInMemory()
  const userUseCase = new CreateUserUseCase(userRepository)
  return userUseCase;
};
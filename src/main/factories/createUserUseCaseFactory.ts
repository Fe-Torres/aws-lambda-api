import { DBInMemory } from "src/infra/repository/inMemory/dbInMemory";
import { CreateUserUseCase } from "src/useCase/userUsecase/createUserUseCase";


export const makeUserUseCase = () => {
  const userRepository = new DBInMemory()
  const userUseCase = new CreateUserUseCase(userRepository)
  return userUseCase;
};

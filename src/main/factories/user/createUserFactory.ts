import { DynamoDBUserRepository } from '../../../infra/dynamoDb/repositories/userRepository';
import { CreateUserUseCase } from '../../../useCase/User/createUserUsecase/createUser';
import { FindUserByEmailUseCase } from '../../../useCase/User/findUserByEmailUsecase/findUserByEmail';

export const makeUserUseCase = () => {
  const userRepository = new DynamoDBUserRepository();
  const findUserByEmailUseCase = new FindUserByEmailUseCase(userRepository);
  const userUseCase = new CreateUserUseCase(userRepository, findUserByEmailUseCase);
  return userUseCase;
};

import { DynamoDBUserRepository } from '../../../infra/dynamoDb/repositories/userRepository';
import { CreateUserUseCase } from '../../../useCase/User/createUserUsecase/createUser';

export const makeUserUseCase = () => {
  const userRepository = new DynamoDBUserRepository();
  const userUseCase = new CreateUserUseCase(userRepository);
  return userUseCase;
};

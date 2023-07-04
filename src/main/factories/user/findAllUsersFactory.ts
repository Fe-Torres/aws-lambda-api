import { DynamoDBUserRepository } from '../../../infra/dynamoDb/repositories/userRepository';
import { FindAllUsersUseCase } from '../../../useCase/User/findAllUsersUsecase/findAllUsers';

export const makeFindAllUsersUseCase = () => {
  const userRepository = new DynamoDBUserRepository();
  const findAllUsersUseCase = new FindAllUsersUseCase(userRepository);
  return findAllUsersUseCase;
};

import { DynamoDBUserRepository } from '../../../infra/dynamoDb/repositories/userRepository';
import { FindUserByIdUseCase } from '../../../useCase/User/findUserByIdUsecase/findUserById';

export const makeFindUserByIdUseCase = () => {
  const userRepository = new DynamoDBUserRepository();
  const findUserByIdUseCase = new FindUserByIdUseCase(userRepository);
  return findUserByIdUseCase;
};

import { DynamoDBUserRepository } from '../../../infra/dynamoDb/repositories/userRepository';
import { DeleteUserByIdUseCase } from '../../../useCase/User/deleteUserByIdUsecase/deleteUserById';
import { FindUserByIdUseCase } from '../../../useCase/User/findUserByIdUsecase/findUserById';

export const makeDeleteUserByIdUseCase = () => {
  const userRepository = new DynamoDBUserRepository();
  const findUserByIdUsecase = new FindUserByIdUseCase(userRepository);
  const deleteUserByIdUseCase = new DeleteUserByIdUseCase(userRepository, findUserByIdUsecase);
  return deleteUserByIdUseCase;
};

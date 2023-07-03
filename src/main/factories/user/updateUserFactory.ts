import { DynamoDBUserRepository } from '../../../infra/dynamoDb/repositories/userRepository';
import { UpdateUserUseCase } from '../../../useCase/User/updateUserUsecase/updateUser';
import { FindUserByEmailUseCase } from '../../../useCase/User/findUserByEmailUsecase/findUserByEmail';
import { FindUserByIdUseCase } from '../../../useCase/User/findUserByIdUsecase/findUserById';

export const makeUpdateUserUseCase = () => {
  const userRepository = new DynamoDBUserRepository();
  const findUserByIdUseCase = new FindUserByIdUseCase(userRepository);
  const findUserByEmailUseCase = new FindUserByEmailUseCase(userRepository);
  const userUseCase = new UpdateUserUseCase(
    userRepository,
    findUserByEmailUseCase,
    findUserByIdUseCase
  );
  return userUseCase;
};

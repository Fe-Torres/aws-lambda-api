import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import schema from './schema';
import { StatusCode, StatusMessage } from '../helper/enum';
import { UserDTO } from 'src/model/user/interfaces/userDto';
import { makeUserUseCase } from 'src/main/factories/createUserUseCaseFactory';

const createUser: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const userData: UserDTO = event.body;

  try {
    const userUseCase = makeUserUseCase(); // Instancia o caso de uso de criação de usuário
    const createdUser = await userUseCase.execute(userData); // Chama o método execute do caso de uso

    return formatJSONResponse({
      message: StatusMessage.OK,
      user: createdUser, // Adicione o usuário criado na resposta, se necessário
    }, StatusCode.OK);
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    return formatJSONResponse({
      message: StatusMessage.INTERNAL_SERVER_ERROR,
      error: error.message,
    }, StatusCode.INTERNAL_SERVER_ERROR);
  }
};

export const main = middyfy(createUser);

import type { ValidatedEventAPIGatewayProxyEvent } from '../../helper/api-gateway';
import { formatJSONResponse } from '../../helper/api-gateway';
import { middyfy } from '../../helper/lambda';
import schema from './schema';
import { StatusCode, StatusMessage } from '../../helper/enum';
import { UserDTO } from 'src/model/user/interfaces/userDto';
import { makeUserUseCase } from '../../../../main/factories/user/createUserFactory';

const createUser: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const userData: UserDTO = event.body;

  try {
    const userUseCase = makeUserUseCase();
    const createdUser = await userUseCase.execute(userData);

    return formatJSONResponse(
      {
        message: StatusMessage.OK,
        user: createdUser,
      },
      StatusCode.OK
    );
  } catch (error) {
    return formatJSONResponse(
      {
        message: StatusMessage.INTERNAL_SERVER_ERROR,
        error: error.message,
      },
      StatusCode.INTERNAL_SERVER_ERROR
    );
  }
};

export const main = middyfy(createUser);

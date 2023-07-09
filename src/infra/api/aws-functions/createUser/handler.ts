import { formatJSONResponse } from '../../helper/api-gateway';
import { middyfy } from '../../helper/lambda';
import { StatusCode, StatusMessage } from '../../helper/enum';
import { makeUserUseCase } from '../../../../main/factories/user/createUserFactory';
import { UserDTO } from '../../../../model/user/interfaces/userDto';
import { JoiValidator } from '../../helper/joiValidation';
import schema from './schema';
import { APIGatewayProxyResult } from 'aws-lambda';

const createUser = async (event): Promise<APIGatewayProxyResult> => {
  const userData: UserDTO = event.body;
  try {
    JoiValidator.validate(userData, schema);

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

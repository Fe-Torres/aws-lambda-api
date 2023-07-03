import { APIGatewayProxyResult } from 'aws-lambda';
import { formatJSONResponse } from '../../helper/api-gateway';
import { middyfy } from '../../helper/lambda';
import { StatusCode, StatusMessage } from '../../helper/enum';
import { makeUpdateUserUseCase } from '../../../../main/factories/user/updateUserFactory';
import { UserDTO } from '../../../../model/user/interfaces/userDto';
import { JoiValidator } from '../../helper/joiValidation';
import schema from './schema';

const updateUser = async (event): Promise<APIGatewayProxyResult> => {
  const { id } = event.pathParameters;
  const userData: UserDTO = event.body;
  try {
    JoiValidator.validate({ id, ...userData }, schema);

    const updateUserUseCase = makeUpdateUserUseCase();
    const updatedUser = await updateUserUseCase.execute(id, userData);

    return formatJSONResponse(
      {
        message: StatusMessage.OK,
        user: updatedUser,
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

export const main = middyfy(updateUser);

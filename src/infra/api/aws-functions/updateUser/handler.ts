import { APIGatewayProxyResult } from 'aws-lambda';
import { formatJSONResponse } from '../../helper/api-gateway';
import { middyfy } from '../../helper/lambda';
import { StatusCode, StatusMessage } from '../../helper/enum';
import { makeUpdateUserUseCase } from '../../../../main/factories/user/updateUserFactory';
import { UserDTO } from '../../../../model/user/interfaces/userDto';
import { JoiValidator } from '../../helper/joiValidation';
import schema from './schema';
import { handleErrorResponse } from '../../helper/handler-error';
import { ActionLog, Logger } from '../../../../main/logs/Loger';

const updateUser = async (event): Promise<APIGatewayProxyResult> => {
  try {
    const { id } = event.pathParameters;
    const userData: UserDTO = event.body;
    Logger.processMessage('UpdateUserFunction', ActionLog.INITIAL, {
      userData,
      id,
    });
    JoiValidator.validate({ id, ...userData }, schema);

    const updateUserUseCase = makeUpdateUserUseCase();
    const updatedUser = await updateUserUseCase.execute(id, userData);
    Logger.processMessage('UpdateUserFunction', ActionLog.END, {
      updatedUser,
    });

    return formatJSONResponse(
      {
        message: StatusMessage.OK,
        user: updatedUser,
      },
      StatusCode.OK
    );
  } catch (error) {
    return handleErrorResponse(error);
  }
};

export const main = middyfy(updateUser);

import { formatJSONResponse } from '../../helper/api-gateway';
import { middyfy } from '../../helper/lambda';
import { StatusCode, StatusMessage } from '../../helper/enum';
import { makeUserUseCase } from '../../../../main/factories/user/createUserFactory';
import { UserDTO } from '../../../../model/user/interfaces/userDto';
import { JoiValidator } from '../../helper/joiValidation';
import schema from './schema';
import { APIGatewayProxyResult } from 'aws-lambda';
import { handleErrorResponse } from '../../helper/handler-error';
import { ActionLog, Logger } from '../../../../main/logs/Loger';

const createUser = async (event): Promise<APIGatewayProxyResult> => {
  try {
    const userData: UserDTO = event.body;
    Logger.processMessage('CreateUserFunction', ActionLog.INITIAL, userData);
    JoiValidator.validate(userData, schema);
    const userUseCase = makeUserUseCase();
    const createdUser = await userUseCase.execute(userData);
    Logger.processMessage('CreateUserFunction', ActionLog.END, userData);

    return formatJSONResponse(
      {
        message: StatusMessage.OK,
        user: createdUser,
      },
      StatusCode.OK
    );
  } catch (error) {
    return handleErrorResponse(error);
  }
};

export const main = middyfy(createUser);

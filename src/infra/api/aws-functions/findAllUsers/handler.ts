import { formatJSONResponse } from '../../helper/api-gateway';
import { middyfy } from '../../helper/lambda';
import { StatusCode, StatusMessage } from '../../helper/enum';
import { makeFindAllUsersUseCase } from '../../../../main/factories/user/findAllUsersFactory';
import { APIGatewayProxyResult } from 'aws-lambda';
import { handleErrorResponse } from '../../helper/handler-error';
import { ActionLog, Logger } from '../../../../main/logs/Loger';

const findAllUsers = async (): Promise<APIGatewayProxyResult> => {
  try {
    Logger.processMessage('FindAllUsersFunction', ActionLog.INITIAL);
    const findAllUsersUseCase = makeFindAllUsersUseCase();
    const users = await findAllUsersUseCase.execute();
    Logger.processMessage('FindAllUsersFunction', ActionLog.END);
    return formatJSONResponse(
      {
        message: StatusMessage.OK,
        users,
      },
      StatusCode.OK
    );
  } catch (error) {
    return handleErrorResponse(error);
  }
};

export const main = middyfy(findAllUsers);

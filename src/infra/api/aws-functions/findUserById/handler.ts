import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { formatJSONResponse } from '../../helper/api-gateway';
import { middyfy } from '../../helper/lambda';
import { StatusCode, StatusMessage } from '../../helper/enum';
import { makeFindUserByIdUseCase } from '../../../../main/factories/user/findUserByIdFactory';
import { handleErrorResponse } from '../../helper/handler-error';
import { ActionLog, Logger } from '../../../../main/logs/Loger';

const findUserById = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const { id } = event.pathParameters;
    Logger.processMessage('FindUserByIdFunction', ActionLog.INITIAL, id);
    const findUserByIdUseCase = makeFindUserByIdUseCase();
    const user = await findUserByIdUseCase.execute(id);
    Logger.processMessage('FindUserByIdFunction', ActionLog.END, id);
    return formatJSONResponse(
      {
        message: StatusMessage.OK,
        user,
      },
      StatusCode.OK
    );
  } catch (error) {
    return handleErrorResponse(error);
  }
};

export const main = middyfy(findUserById);

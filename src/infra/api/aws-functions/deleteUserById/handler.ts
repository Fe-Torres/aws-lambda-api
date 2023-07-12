import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { formatJSONResponse } from '../../helper/api-gateway';
import { middyfy } from '../../helper/lambda';
import { StatusCode, StatusMessage } from '../../helper/enum';
import { makeDeleteUserByIdUseCase } from '../../../../main/factories/user/deleteUserByIdFactory';
import { handleErrorResponse } from '../../helper/handler-error';
import { ActionLog, Logger } from '../../../../main/logs/Loger';

const deleteUserById = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const { id } = event.pathParameters;
    Logger.processMessage('DeleteUserByIdFunction', ActionLog.INITIAL, id);
    const deleteUserByIdUseCase = makeDeleteUserByIdUseCase();
    await deleteUserByIdUseCase.execute(id);
    Logger.processMessage('DeleteUserByIdFunction', ActionLog.END, id);

    return formatJSONResponse(
      {
        message: StatusMessage.OK,
      },
      StatusCode.OK
    );
  } catch (error) {
    return handleErrorResponse(error);
  }
};

export const main = middyfy(deleteUserById);

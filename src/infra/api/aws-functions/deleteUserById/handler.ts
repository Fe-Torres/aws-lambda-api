import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { formatJSONResponse } from '../../helper/api-gateway';
import { middyfy } from '../../helper/lambda';
import { StatusCode, StatusMessage } from '../../helper/enum';
import { makeDeleteUserByIdUseCase } from '../../../../main/factories/user/deleteUserByIdFactory';
import { handleErrorResponse } from '../../helper/handler-error';

const deleteUserById = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const { id } = event.pathParameters;

  try {
    const deleteUserByIdUseCase = makeDeleteUserByIdUseCase();
    await deleteUserByIdUseCase.execute(id);

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

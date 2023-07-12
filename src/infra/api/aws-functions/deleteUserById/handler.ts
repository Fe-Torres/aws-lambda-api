import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { formatJSONResponse } from '../../helper/api-gateway';
import { middyfy } from '../../helper/lambda';
import { StatusCode, StatusMessage } from '../../helper/enum';
import { makeDeleteUserByIdUseCase } from '../../../../main/factories/user/deleteUserByIdFactory';

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
    return formatJSONResponse(
      { message: error.message },
      error.code || StatusCode.INTERNAL_SERVER_ERROR
    );
  }
};

export const main = middyfy(deleteUserById);

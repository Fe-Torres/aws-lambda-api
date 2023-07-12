import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { formatJSONResponse } from '../../helper/api-gateway';
import { middyfy } from '../../helper/lambda';
import { StatusCode, StatusMessage } from '../../helper/enum';
import { makeFindUserByIdUseCase } from '../../../../main/factories/user/findUserByIdFactory';
import { handleErrorResponse } from '../../helper/handler-error';

const findUserById = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const { id } = event.pathParameters;

  try {
    const findUserByIdUseCase = makeFindUserByIdUseCase();
    const user = await findUserByIdUseCase.execute(id);

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

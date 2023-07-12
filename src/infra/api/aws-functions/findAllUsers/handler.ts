import { formatJSONResponse } from '../../helper/api-gateway';
import { middyfy } from '../../helper/lambda';
import { StatusCode, StatusMessage } from '../../helper/enum';
import { makeFindAllUsersUseCase } from '../../../../main/factories/user/findAllUsersFactory';
import { APIGatewayProxyResult } from 'aws-lambda';
import { handleErrorResponse } from '../../helper/handler-error';

const findAllUsers = async (): Promise<APIGatewayProxyResult> => {
  try {
    const findAllUsersUseCase = makeFindAllUsersUseCase();
    const users = await findAllUsersUseCase.execute();

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

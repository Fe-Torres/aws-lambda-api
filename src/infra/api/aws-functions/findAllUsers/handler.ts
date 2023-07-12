import { formatJSONResponse } from '../../helper/api-gateway';
import { middyfy } from '../../helper/lambda';
import { StatusCode, StatusMessage } from '../../helper/enum';
import { makeFindAllUsersUseCase } from '../../../../main/factories/user/findAllUsersFactory';
import { APIGatewayProxyResult } from 'aws-lambda';

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
    return formatJSONResponse(
      { message: error.message },
      error.code || StatusCode.INTERNAL_SERVER_ERROR
    );
  }
};

export const main = middyfy(findAllUsers);

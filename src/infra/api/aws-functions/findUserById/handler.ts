import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { StatusCode, StatusMessage } from '../../helper/enum';
import { makeFindUserByIdUseCase } from '../../../../main/factories/user/findUserByIdFactory';

const findUserById = async (event) => {
  const { id } = event.pathParameters

  try {
    const findUserByIdUseCase = makeFindUserByIdUseCase();
    const user = await findUserByIdUseCase.execute(id);

    return formatJSONResponse({
      message: StatusMessage.OK,
      user,
    }, StatusCode.OK);
  } catch (error) {
    return formatJSONResponse({
      message: StatusMessage.INTERNAL_SERVER_ERROR,
      error: error.message,
    }, StatusCode.INTERNAL_SERVER_ERROR);
  }
};

export const main = middyfy(findUserById);

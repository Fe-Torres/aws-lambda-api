import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import schema from './schema';
import { StatusCode, StatusMessage } from '../helper/enum';

const createUser: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const userData: UserDTO = event.body
  console.log(userData.name)
  return formatJSONResponse({
    message: StatusMessage.OK,
  }, StatusCode.OK);
};

export const main = middyfy(createUser);

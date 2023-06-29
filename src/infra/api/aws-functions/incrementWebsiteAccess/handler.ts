import type { ValidatedEventAPIGatewayProxyEvent } from '../../helper/api-gateway';
import { formatJSONResponse } from '../../helper/api-gateway';
import { middyfy } from '../../helper/lambda';
import schema from './schema';
import { StatusCode, StatusMessage } from '../../helper/enum';
import { makeIncrementWebsiteAccessUseCase } from '../../../../main/factories/website/incrementWebsiteAccessFactory';

const incrementWebsiteAccess: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async (event) => {
  const { url } = event.body;

  try {
    const incrementWebsiteAccessUseCase = makeIncrementWebsiteAccessUseCase();
    const website = await incrementWebsiteAccessUseCase.execute(url);

    return formatJSONResponse(
      {
        message: StatusMessage.OK,
        website,
      },
      StatusCode.OK
    );
  } catch (error) {
    return formatJSONResponse(
      {
        message: StatusMessage.INTERNAL_SERVER_ERROR,
        error: error.message,
      },
      StatusCode.INTERNAL_SERVER_ERROR
    );
  }
};

export const main = middyfy(incrementWebsiteAccess);

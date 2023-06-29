import { StatusCode, StatusMessage } from '../../helper/enum';
import { makeCountWebsiteAccessUseCase } from '../../../../main/factories/website/countWebsiteAccessFactory';
import { formatJSONResponse } from '../../helper/api-gateway';
import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { middyfy } from '../../helper/lambda';

const countWebsiteAccess = async (
  event: APIGatewayEvent
): Promise<Promise<APIGatewayProxyResult>> => {
  try {
    const { url } = event.queryStringParameters;
    const countWebsiteAccessUseCase = makeCountWebsiteAccessUseCase();
    const website = await countWebsiteAccessUseCase.execute(url);

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

export const main = middyfy(countWebsiteAccess);

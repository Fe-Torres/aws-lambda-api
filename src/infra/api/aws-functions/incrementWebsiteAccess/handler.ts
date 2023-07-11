import { APIGatewayProxyResult } from 'aws-lambda';
import { formatJSONResponse } from '../../helper/api-gateway';
import { middyfy } from '../../helper/lambda';
import { StatusCode, StatusMessage } from '../../helper/enum';
import { makeIncrementWebsiteAccessUseCase } from '../../../../main/factories/website/incrementWebsiteAccessFactory';
import { JoiValidator } from '../../helper/joiValidation';
import schema from './schema';

const incrementWebsiteAccess = async (
  event
): Promise<APIGatewayProxyResult> => {
  const { url } = event.body;
  try {
    JoiValidator.validate(url, schema);

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
      { message: error.message },
      error.code || StatusCode.INTERNAL_SERVER_ERROR
    );
  }
};

export const main = middyfy(incrementWebsiteAccess);

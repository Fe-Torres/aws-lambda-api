import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { StatusCode, StatusMessage } from '../../helper/enum';
import { makeCountWebsiteAccessUseCase } from '../../../../main/factories/website/countWebsiteAccessFactory';

const countWebsiteAccess = async (event) => {
  const { url } = event.pathParameters;

  try {
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

import { StatusCode, StatusMessage } from '../../helper/enum';
import { makeCountWebsiteAccessUseCase } from '../../../../main/factories/website/countWebsiteAccessFactory';
import { formatJSONResponse } from '../../helper/api-gateway';
import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { middyfy } from '../../helper/lambda';
import { IWebsiteDTO } from '../../../../model/website/interfaces/WebsiteDto';
import { ActionLog, Logger } from '../../../../main/logs/Loger';
import { handleErrorResponse } from '../../helper/handler-error';

const countWebsiteAccess = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const WebsiteQueryParams: IWebsiteDTO = event.queryStringParameters;
    Logger.processMessage(
      'CountWebsiteFunction',
      ActionLog.INITIAL,
      WebsiteQueryParams
    );
    const countWebsiteAccessUseCase = makeCountWebsiteAccessUseCase();
    const website = await countWebsiteAccessUseCase.execute(WebsiteQueryParams);
    Logger.processMessage('CountWebsiteFunction', ActionLog.END);
    return formatJSONResponse(
      {
        message: StatusMessage.OK,
        ...website,
      },
      StatusCode.OK
    );
  } catch (error) {
    return handleErrorResponse(error);
  }
};

export const main = middyfy(countWebsiteAccess);

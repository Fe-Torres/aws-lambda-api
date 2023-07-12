import { APIGatewayProxyResult } from 'aws-lambda';
import { formatJSONResponse } from '../../helper/api-gateway';
import { middyfy } from '../../helper/lambda';
import { StatusCode, StatusMessage } from '../../helper/enum';
import { makeIncrementWebsiteAccessUseCase } from '../../../../main/factories/website/incrementWebsiteAccessFactory';
import { JoiValidator } from '../../helper/joiValidation';
import schema from './schema';
import { handleErrorResponse } from '../../helper/handler-error';
import { ActionLog, Logger } from '../../../../main/logs/Loger';

const incrementWebsiteAccess = async (
  event
): Promise<APIGatewayProxyResult> => {
  try {
    const { url } = event.body;
    Logger.processMessage('incrementWebsiteAccess', ActionLog.INITIAL, url);
    JoiValidator.validate(url, schema);
    const incrementWebsiteAccessUseCase = makeIncrementWebsiteAccessUseCase();
    const website = await incrementWebsiteAccessUseCase.execute(url);
    Logger.processMessage('incrementWebsiteAccess', ActionLog.END, url);
    return formatJSONResponse(
      {
        message: StatusMessage.OK,
        website,
      },
      StatusCode.OK
    );
  } catch (error) {
    return handleErrorResponse(error);
  }
};

export const main = middyfy(incrementWebsiteAccess);

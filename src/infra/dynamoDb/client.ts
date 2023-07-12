import * as AWS from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { ActionLog, Logger } from '../../main/logs/Loger';

const dynamoDBClient = (): DocumentClient => {
  Logger.processMessage('DB Client', ActionLog.INITIAL);
  const dynamoDbClient = new AWS.DynamoDB.DocumentClient();
  Logger.processMessage('DB Client', ActionLog.END);
  return dynamoDbClient;
};

export default dynamoDBClient;

import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { IUserRepository } from '@models/user/interfaces/IUserRepository';
import { User } from '@models/user/User';
import dynamoDBClient from '../client';
import { UserDTO } from '../../../model/user/interfaces/userDto';
import { UserMapperDynamoDb } from './helper/UserMapper';
import { ActionLog, Logger } from '../../../main/logs/Loger';

export class DynamoDBUserRepository implements IUserRepository {
  private readonly tableName: string;
  private readonly documentClient: DocumentClient;

  constructor() {
    this.tableName = 'UserTable';
    this.documentClient = dynamoDBClient();
  }

  async findAll(): Promise<UserDTO[]> {
    Logger.processMessage(this.findAll.name, ActionLog.INITIAL);
    const params: DocumentClient.ScanInput = {
      TableName: this.tableName,
    };

    const result = await this.documentClient.scan(params).promise();
    const users = UserMapperDynamoDb.mapScanResultToUsers(result);
    Logger.processMessage(this.findAll.name, ActionLog.END);
    return users;
  }

  async findByEmail(email: string): Promise<User | null> {
    Logger.processMessage(this.findByEmail.name, ActionLog.INITIAL);
    // Alterar para um GSI?
    const params: DocumentClient.ScanInput = {
      TableName: this.tableName,
      FilterExpression: 'email = :email',
      ExpressionAttributeValues: {
        ':email': email,
      },
    };

    const result = await this.documentClient.scan(params).promise();
    const users = UserMapperDynamoDb.mapScanResultToUsers(result);
    Logger.processMessage(this.findByEmail.name, ActionLog.END);
    if (users && users.length > 0) {
      return users[0];
    }

    return null;
  }

  async save(user: User): Promise<User> {
    Logger.processMessage(this.save.name, ActionLog.INITIAL);

    const params: DocumentClient.PutItemInput = {
      TableName: this.tableName,
      Item: {
        id: user.id,
        name: user.name,
        email: user.email,
        age: user.age,
      },
    };

    await this.documentClient.put(params).promise();
    Logger.processMessage(this.save.name, ActionLog.END);
    return user;
  }

  async findById(userID: string): Promise<User | null> {
    Logger.processMessage(this.findById.name, ActionLog.INITIAL);

    const params: DocumentClient.GetItemInput = {
      TableName: this.tableName,
      Key: {
        id: userID,
      },
    };

    const result = await this.documentClient.get(params).promise();
    const user = UserMapperDynamoDb.mapGetResultToUser(result);
    Logger.processMessage(this.findById.name, ActionLog.END);
    return user;
  }

  async updateById(
    userID: string,
    dataToUpdate: UserDTO
  ): Promise<User | null> {
    Logger.processMessage(this.updateById.name, ActionLog.INITIAL);
    const userToUpdate = await this.findById(userID);
    if (!userToUpdate) {
      return null;
    }

    const params: DocumentClient.UpdateItemInput = {
      TableName: this.tableName,
      Key: {
        id: userID,
      },
      UpdateExpression: 'set #name = :name, #email = :email, #age = :age',
      ExpressionAttributeNames: {
        '#name': 'name',
        '#email': 'email',
        '#age': 'age',
      },
      ExpressionAttributeValues: {
        ':name': dataToUpdate.name,
        ':email': dataToUpdate.email,
        ':age': dataToUpdate.age,
      },
      ReturnValues: 'ALL_NEW',
    };

    const response = await this.documentClient.update(params).promise();
    const userUpdated = UserMapperDynamoDb.mapUpdateItemToUser(response);
    Logger.processMessage(this.updateById.name, ActionLog.END);
    return userUpdated;
  }

  async deleteById(userID: string): Promise<void> {
    Logger.processMessage(this.deleteById.name, ActionLog.INITIAL);
    const params: DocumentClient.DeleteItemInput = {
      TableName: this.tableName,
      Key: {
        id: userID,
      },
    };

    await this.documentClient.delete(params).promise();
    Logger.processMessage(this.deleteById.name, ActionLog.END);
    return;
  }
}

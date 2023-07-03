import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { IUserRepository } from '@models/user/interfaces/IUserRepository';
import { User } from '@models/user/User';
import dynamoDBClient from '../client';
import { UserDTO } from '../../../model/user/interfaces/userDto';
import { UserMapperDynamoDb } from './helper/UserMapper';

export class DynamoDBUserRepository implements IUserRepository {
  private readonly tableName: string;
  private readonly documentClient: DocumentClient;

  constructor() {
    this.tableName = 'UserTable';
    this.documentClient = dynamoDBClient();
  }

  async findByEmail(email: string): Promise<User> {
    const params: DocumentClient.GetItemInput = {
      TableName: this.tableName,
      Key: {
        email: email,
      },
    };

    const result = await this.documentClient.get(params).promise();
    const user = UserMapperDynamoDb.mapGetResultToUser(result);

    return user;
  }

  async save(user: User): Promise<User> {
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

    return user;
  }

  async findById(userID: string): Promise<User | null> {
    const params: DocumentClient.GetItemInput = {
      TableName: this.tableName,
      Key: {
        id: userID,
      },
    };

    const result = await this.documentClient.get(params).promise();
    const user = UserMapperDynamoDb.mapGetResultToUser(result);

    return user;
  }

  async updateById(userID: string, dataToUpdate: UserDTO): Promise<User | null> {
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
      ExpressionAttributeValues: {
        ':name': dataToUpdate.name,
        ':email': dataToUpdate.email,
        ':age': dataToUpdate.age,
      },
      ReturnValues: 'ALL_NEW',
    };

    const result = await this.documentClient.update(params).promise();
    const updatedUser = UserMapperDynamoDb.mapGetResultToUser(result);

    return updatedUser;
  }

  async deleteById(userID: string): Promise<void> {
    const params: DocumentClient.DeleteItemInput = {
      TableName: this.tableName,
      Key: {
        id: userID,
      },
    };

    await this.documentClient.delete(params).promise();
  }
}

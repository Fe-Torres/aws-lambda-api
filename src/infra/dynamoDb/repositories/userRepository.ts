import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { IUserRepository } from '@models/user/interfaces/IUserRepository';
import { User } from '@models/user/User';
import dynamoDBClient from '../client';

export class DynamoDBUserRepository implements IUserRepository {
  private readonly tableName: string;
  private readonly documentClient: DocumentClient;

  constructor() {
    this.tableName = 'UserTable';
    this.documentClient = dynamoDBClient();
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

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      age: user.age,
    };
  }

  async findById(userID: string): Promise<User | null> {
    const params: DocumentClient.GetItemInput = {
      TableName: this.tableName,
      Key: {
        id: userID,
      },
    };

    const result = await this.documentClient.get(params).promise();

    if (!result.Item) {
      return null;
    }

    return {
      id: result.Item.id,
      name: result.Item.name,
      email: result.Item.email,
      age: result.Item.age,
    };
  }
}

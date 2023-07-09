import { DynamoDB } from 'aws-sdk';
import { User } from '@models/user/User';

interface DynamoDBUserItem {
  id: string;
  name: string;
  email: string;
  age: number;
}

export class UserMapperDynamoDb {
  private static mapToUser(item: DynamoDB.DocumentClient.AttributeMap): User {
    return {
      id: item?.id,
      name: item.name,
      email: item.email,
      age: item.age,
    };
  }

  static mapGetResultToUser(
    result: DynamoDB.DocumentClient.GetItemOutput
  ): User | null {
    if (!result.Item) {
      return null;
    }

    return this.mapToUser(result.Item as DynamoDBUserItem);
  }

  static mapScanResultToUsers(
    result: DynamoDB.DocumentClient.ScanOutput
  ): User[] {
    if (!result.Items) {
      return [];
    }

    return result.Items.map((item) => ({
      id: item.id,
      name: item.name,
      email: item.email,
      age: item.age,
    }));
  }

  static mapUpdateItemToUser(
    item: DynamoDB.DocumentClient.PutItemOutput
  ): User {
    return this.mapToUser(item.Attributes as DynamoDBUserItem);
  }
}

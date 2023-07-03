import type { AWS } from '@serverless/typescript';
import {
  createUser,
  findUserById,
  deleteUserById,
  findAllUsers,
  incrementWebsiteAccess,
  countWebsiteAccess,
} from './src/infra/api/aws-functions';

// Validar a transformação de uma env
const providerRegion = 'us-east-1';

const serverlessConfiguration: AWS = {
  service: 'aws-serverless-typescript-api',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-offline', 'serverless-dotenv-plugin'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: providerRegion,
    httpApi: {
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    iam: {
      role: {
        statements: [{
          Effect: 'Allow',
          Action: [
            'dynamodb:DescribeTable',
            'dynamodb:Query',
            'dynamodb:Scan',
            'dynamodb:GetItem',
            'dynamodb:PutItem',
            'dynamodb:UpdateItem',
            'dynamodb:DeleteItem',
          ],
          Resource: `arn:aws:dynamodb:${providerRegion}:*:table/UserTable`,
        }],
      },
    },
  },
  // import the function via paths
  functions: {
    createUser,
    findUserById,
    findAllUsers,
    deleteUserById,
    incrementWebsiteAccess,
    countWebsiteAccess,
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    dynamodb: {
      start: {
        port: 5000,
        inMemory: true,
        migrate: true,
      },
      stages: 'dev',
    },
  },
  resources: {
    Resources: {
      TodosTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: 'UserTable',
          AttributeDefinitions: [{
            AttributeName: 'id',
            AttributeType: 'S',
          }],
          KeySchema: [{
            AttributeName: 'id',
            KeyType: 'HASH',
          }],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          },

        },
      },
    },
  },
};
module.exports = serverlessConfiguration;

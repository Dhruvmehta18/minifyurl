const { DocumentClient } = require('aws-sdk/clients/dynamodb');
const config = require('../../src/config/config');
const logger = require('../../src/config/logger');

const awsConfig = config.aws;

const table = awsConfig.dynamodb.URL_TABLE.TableName;

const isTest = process.env.JEST_WORKER_ID;
const configDoc = {
  convertEmptyValues: true,
  ...(isTest && {
    endpoint: awsConfig.dynamodb.endpoint,
    sslEnabled: false,
    region: awsConfig.dynamodb.region,
  }),
};

const ddb = new DocumentClient(configDoc);

// Only use for tests
const setShortenUrl = (minifyUrlObj) => {
  const params = {
    TableName: table,
    Item: {
      ...minifyUrlObj,
    },
  };

  logger.debug('Adding a new item...');
  return ddb.put(params).promise();
};

// Only use for tests
const deleteUrl = (hash) => {
  const params = {
    TableName: table,
    Key: {
      hash,
    },
  };
  return ddb.delete(params).promise();
};

const setupTestAwsDynamoDB = (minify_id = '') => {
  beforeAll(async () => {
    const now = new Date();
    const minifyUrlObj = {
      hash: minify_id,
      originalLink: 'https://www.google.com',
      creationTime: now.toISOString(),
      expirationTime: now.toISOString(),
    };
    await setShortenUrl(minifyUrlObj);
  });

  afterAll(async () => {
    await deleteUrl(minify_id);
  });
};

module.exports = { setupTestAwsDynamoDB, ddb };

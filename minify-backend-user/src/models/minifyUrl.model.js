const AWS = require('aws-sdk');
const config = require('../config/config');
const logger = require('../config/logger');

const awsConfig = config.aws;
const { region } = awsConfig.dynamodb;

const endpoint = region === 'local-env' ? `http://${awsConfig.dynamodb.endpoint}` : `${awsConfig.dynamodb.endpoint}`;

AWS.config.update({
  region,
});

if (region === 'local-env' || config.env === 'development' || config.env === 'test') {
  AWS.config.update({
    endpoint,
  });
}

const DynamoDB = new AWS.DynamoDB();
const docClient = new AWS.DynamoDB.DocumentClient();

const table = awsConfig.dynamodb.URL_TABLE.TableName;

const createTable = async () => {
  return DynamoDB.createTable(awsConfig.dynamodb.URL_TABLE).promise();
};

const setShortenUrl = async (minifyUrlObj) => {
  const params = {
    TableName: table,
    Item: minifyUrlObj,
  };
  return docClient.put(params).promise();
};

const getUrl = async (hash) => {
  const params = {
    TableName: table,
    Key: {
      hash,
    },
  };

  return docClient.get(params).promise();
};

const updateOriginalUrl = async (hash, originalLink = '') => {
  const params = {
    TableName: table,
    Key: {
      hash,
    },
    UpdateExpression: 'set URL.originalLink = :u',
    ExpressionAttributeValues: {
      ':u': originalLink,
    },
    ReturnValues: 'UPDATED_NEW',
  };

  return docClient.update(params).promise();
};

const deleteUrl = async (hash) => {
  const params = {
    TableName: table,
    Key: {
      hash,
    },
  };

  logger.d('Attempting a conditional delete...');
  return docClient.delete(params).promise();
};

const MinifyUrl = {
  createTable,
  setShortenUrl,
  getUrl,
  updateOriginalUrl,
  deleteUrl,
};

module.exports = MinifyUrl;

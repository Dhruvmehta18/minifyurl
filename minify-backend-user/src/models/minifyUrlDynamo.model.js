const AWS = require('aws-sdk');
const config = require('../config/config');

const awsConfig = config.aws;
const { region } = awsConfig.dynamodb;

let extraConfig = {
  region,
};

if (region === 'local-env' || config.env === 'development' || config.env === 'test') {
  // noinspection HttpUrlsUsage : Because it is for testing and development environment only
  const endpoint = region === 'local-env' ? `http://${awsConfig.dynamodb.endpoint}` : `${awsConfig.dynamodb.endpoint}`;
  extraConfig = {
    endpoint,
  };
}

AWS.config.update({
  region,
  ...extraConfig,
});

const DynamoDB = new AWS.DynamoDB();
const docClient = new AWS.DynamoDB.DocumentClient();

const table = awsConfig.dynamodb.URL_TABLE.TableName;

const createTable = async () => {
  return DynamoDB.createTable(awsConfig.dynamodb.URL_TABLE).promise();
};

const setShortenUrl = async (minifyUrlObj) => {
  const allowedKeys = ['minifyId', 'originalLink', 'creationTime', 'expirationTime', 'userId'];
  const sanitizedMinifyUrlObj = Object.keys(minifyUrlObj)
    .filter((key) => allowedKeys.includes(key))
    .reduce((obj, currKey) => {
      return {
        ...obj,
        [currKey]: minifyUrlObj[currKey],
      };
    }, {});
  const params = {
    TableName: table,
    Item: sanitizedMinifyUrlObj,
  };
  return docClient.put(params).promise();
};

const getUrl = async (hash) => {
  const params = {
    TableName: table,
    Key: {
      minifyId: hash,
    },
  };

  return docClient.get(params).promise();
};

const updateOriginalUrl = async (hash, link = '') => {
  const params = {
    TableName: table,
    Key: {
      minifyId: hash,
    },
    UpdateExpression: 'set link = :u',
    ConditionExpression: 'attribute_exists(minifyId)',
    ExpressionAttributeValues: {
      ':u': link,
    },
    ReturnValues: 'UPDATED_NEW',
  };

  return docClient.update(params).promise();
};

const deleteUrl = async (hash) => {
  const params = {
    TableName: table,
    Key: {
      minifyId: hash,
    },
    ConditionExpression: 'attribute_exists(minifyId)',
  };

  return docClient.delete(params).promise();
};

const MinifyUrlDynamoModel = {
  createTable,
  setShortenUrl,
  getUrl,
  updateOriginalUrl,
  deleteUrl,
};

module.exports = MinifyUrlDynamoModel;

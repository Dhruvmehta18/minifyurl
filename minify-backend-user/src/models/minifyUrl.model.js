const AWS = require('aws-sdk');
const config = require('../config/config');

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
var docClient = new AWS.DynamoDB.DocumentClient();

var table = awsConfig.dynamodb.URL_TABLE.TableName;

const createTable = async () => {
  return await DynamoDB.createTable(awsConfig.dynamodb.URL_TABLE).promise();
};

const setShortenUrl = async (minifyUrlObj) => {
  var params = {
    TableName: table,
    Item: minifyUrlObj,
  };
    return await docClient.put(params).promise();
};

const getUrl = async (hash) => {
  var params = {
    TableName: table,
    Key: {
      hash: hash,
    },
  };

  return await docClient.get(params).promise();
};

const updateUrl = (hash, originalLink = "") => {
  var params = {
    TableName: table,
    Key: {
      hash: hash,
    },
    UpdateExpression: 'set URL.originalLink = :u',
    ExpressionAttributeValues: {
      ':u': originalLink,
    },
    ReturnValues: 'UPDATED_NEW',
  };

  return await docClient.update(params).promise();
};

const deleteUrl = (hash) => {
  var params = {
    TableName: table,
    Key: {
      hash: hash,
    },
  };

  console.log('Attempting a conditional delete...');
  return await docClient.delete(params).promise();
};

const MinifyUrl = {
  createTable: createTable,
  setShortenUrl: setShortenUrl,
  getUrl: getUrl,
  updateUrl: updateUrl,
  deleteUrl: deleteUrl,
};

module.exports = MinifyUrl;

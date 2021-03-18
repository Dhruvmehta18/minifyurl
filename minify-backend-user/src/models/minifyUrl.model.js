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

var table = aws.dynamodb.URL_TABLE.TableName;

const createTable = async () => {
  var params = aws.dynamodb.URL_TABLE;
  logger.info(`Creating table ${params}...`);
  try {
    const data = await DynamoDB.createTable(params).promise();
    logger.info('Success');
    logger.info(data);
    return data;
  } catch (error) {
    logger.error(error);
  }
};

const setShortenUrl = async (minifyUrlObj) => {
  var params = {
    TableName: table,
    Item: minifyUrlObj,
  };

  logger.debug('Adding a new item...');
  try {
    const data = await docClient.put(params).promise();
    logger.debug('Success');
    logger.debug(data);
    return data;
  } catch (error) {
    throw error;
  }
};

const getOriginalUrl = (hash) => {
  var params = {
    TableName: table,
    Key: {
      hash: hash,
    },
  };

  docClient.get(params, function (err, data) {
    if (err) {
      logger.error('Unable to read item. Error JSON:', JSON.stringify(err, null, 2));
    } else {
      logger.debug('GetItem succeeded:', JSON.stringify(data, null, 2));
    }
  });
};

const updateUrl = (hash) => {
  var params = {
    TableName: table,
    Key: {
      hash: hash,
    },
    UpdateExpression: 'set info.rating = :r, info.plot=:p, info.actors=:a',
    ExpressionAttributeValues: {
      ':r': 5.5,
      ':p': 'Everything happens all at once.',
      ':a': ['Larry', 'Moe', 'Curly'],
    },
    ReturnValues: 'UPDATED_NEW',
  };

  console.log('Updating the item...');
  docClient.update(params, function (err, data) {
    if (err) {
      logger.error('Unable to update item. Error JSON:', JSON.stringify(err, null, 2));
    } else {
      logger.debug('UpdateItem succeeded:', JSON.stringify(data, null, 2));
    }
  });
};

const deleteUrl = (hash) => {
  var params = {
    TableName: table,
    Key: {
      hash: hash,
    },
  };

  console.log('Attempting a conditional delete...');
  docClient.delete(params, function (err, data) {
    if (err) {
      logger.error('Unable to delete item. Error JSON:', JSON.stringify(err, null, 2));
    } else {
      logger.debug('DeleteItem succeeded:', JSON.stringify(data, null, 2));
    }
  });
};

const MinifyUrl = {
  createTable: createTable,
  setShortenUrl: setShortenUrl,
  getOriginalUrl: getOriginalUrl,
  updateUrl: updateUrl,
  deleteUrl: deleteUrl,
};

module.exports = MinifyUrl;

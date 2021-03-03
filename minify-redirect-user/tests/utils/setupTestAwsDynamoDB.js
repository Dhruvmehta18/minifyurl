var AWS = require('aws-sdk');
const config = require('../../src/config/config');

const aws = config.aws;

if (config.env === 'test') {
  AWS.config.update({
    region: 'local',
    endpoint: config.aws.dynamodb.endpoint,
  });
}

var docClient = new AWS.DynamoDB.DocumentClient();

var table = aws.dynamodb.URL_TABLE.TableName;

//Only use for tests
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

//Only use for tests
const deleteUrl = async (hash) => {
  var params = {
    TableName: table,
    Key: {
      hash: hash,
    },
  };

  console.log('Attempting a conditional delete...');
  try {
    const data = docClient.delete(params).promise();
    logger.debug('Item Successfully deleted');
    return data;
  } catch (error) {
    throw error;
  }
};

const setupTestAwsDynamoDB = (hash = '') => {
  beforeAll(async () => {
    const now = new Date();
    const minifyUrlObj = {
      hash: hash,
      originalLink: 'https://www.google.com',
      creationTime: now.toISOString(),
      expirationTime: now.toISOString(),
    };
    const data = await setShortenUrl(minifyUrlObj);
    if (!data) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Some error happen on our side');
    }
  });

  afterAll(async () => {
    await deleteUrl(hash);
  });
};

module.exports = setupTestAwsDynamoDB;

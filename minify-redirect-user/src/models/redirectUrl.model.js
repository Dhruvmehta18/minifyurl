var AWS = require('aws-sdk');
const config = require('../config/config');
const logger = require('../config/logger');

const aws = config.aws;

if (config.env === 'development') {
  AWS.config.update({
    region: 'us-east-2',
    // endpoint: 'http://dynamodb-local-redirect:8000', //if using docker-comose.dev script then this else localhost in place of dynamodb-local
  });
}

var docClient = new AWS.DynamoDB.DocumentClient();

var table = aws.dynamodb.URL_TABLE.TableName;

const getOriginalUrl = async (minify_id = '') => {
  var params = {
    TableName: table,
    Key: {
      hash: minify_id,
    },
    AttributesToGet: ['originalLink', 'expirationTime'],
  };
  try {
    const data = await docClient.get(params).promise();
    logger.debug(JSON.stringify(data));
    return data;
  } catch (error) {
    throw error;
    //TODO 1 : fix error controlling mechanism
  }
};

const RedirectUrl = {
  getOriginalUrl,
};

module.exports = RedirectUrl;

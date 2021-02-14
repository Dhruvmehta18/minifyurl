var AWS = require('aws-sdk');
const config = require('../config/config');
const logger = require('../config/logger');

const aws = config.aws;

if (config.env === 'development') {
  AWS.config.update({
    region: 'local',
    endpoint: config.aws.dynamodb.endpoint, //if using docker-comose.dev script then use this else localhost in place of dynamodb-local
  });
}
if(config.env === 'production'){
  AWS.config.update({
    region: 'us-east-2',
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
  const data = await docClient.get(params).promise();
  logger.debug(JSON.stringify(data));
  return data;
};

const RedirectUrl = {
  getOriginalUrl,
};

module.exports = RedirectUrl;

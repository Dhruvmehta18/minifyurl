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

const docClient = new AWS.DynamoDB.DocumentClient();

const table = awsConfig.dynamodb.URL_TABLE.TableName;

const getOriginalUrl = async (minify_id = '') => {
  const params = {
    TableName: table,
    Key: {
      minifyId: minify_id,
    },
    AttributesToGet: ['originalLink', 'expirationTime', 'userId'],
  };
  return docClient.get(params).promise();
};

const RedirectUrl = {
  getOriginalUrl,
};

module.exports = RedirectUrl;

const AWS = require('aws-sdk');
const config = require('../config/config');

const awsConfig = config.aws;
const { region } = awsConfig.dynamodb;
AWS.config.update({
  region,
});

if (config.env === 'development' || config.env === 'test') {
  const endpoint =
    awsConfig.dynamodb.region === 'local-env' ? `http://${awsConfig.dynamodb.endpoint}` : `${awsConfig.dynamodb.endpoint}`;
  // if using docker-comose.dev script then use this else localhost in place of dynamodb-local
  AWS.config.update({
    endpoint,
  });
}

const docClient = new AWS.DynamoDB.DocumentClient();

const table = awsConfig.dynamodb.URL_TABLE.TableName;

const getOriginalUrl = async (minify_id = '') => {
  const params = {
    TableName: table,
    Key: {
      hash: minify_id,
    },
    AttributesToGet: ['originalLink', 'expirationTime'],
  };
  return docClient.get(params).promise();
};

const RedirectUrl = {
  getOriginalUrl,
};

module.exports = RedirectUrl;

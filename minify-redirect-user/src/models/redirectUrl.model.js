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

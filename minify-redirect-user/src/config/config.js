const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3001).required(),
    MONGODB_URL: Joi.string().required().description('Mongo DB url'),
    AWS_ACCESS_KEY_ID: Joi.string().required().description('aws access key for accessing dynamodb'),
    AWS_SECRET_ACCESS_KEY:  Joi.string().required().description('aws secret access key for accessing dynamodb'),
    DYNAMODB_URL: Joi.string().valid('http://dynamodb-local-redirect:8000', 'http://dynamodb-local:8000')
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongoose: {
    url: envVars.MONGODB_URL + (envVars.NODE_ENV === 'test' ? '-test' : ''),
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  aws: {
    dynamodb: {
      endpoint: envVars.DYNAMODB_URL,
      URL_TABLE: {
        TableName: 'URL'
      }
    }
  }
};

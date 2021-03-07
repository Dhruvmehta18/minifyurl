const crypto = require('crypto');
const { RedirectUrl } = require('../../../src/models');
const { setupTestAwsDynamoDB } = require('../../utils/setupTestAwsDynamoDB');
const logger = require('../../../src/config/logger');

const minifyId = crypto
  .randomBytes(16)
  .toString('base64')
  .match(/([a-zA-Z0-9]{7})/)[0];
logger.debug(minifyId);
setupTestAwsDynamoDB(minifyId);

describe('Redirect Url model', () => {
  test('should sent Item object when hash property is present in URL database', async () => {
    const { Item } = await RedirectUrl.getOriginalUrl(minifyId);
    expect(Item).toBeDefined();
  });

  test('should work correctly and get only originalLink and expirationTime property as output', async () => {
    const { Item } = await RedirectUrl.getOriginalUrl(minifyId);
    expect(Item).toHaveProperty('originalLink');
    expect(Item).toHaveProperty('expirationTime');
    expect(Item).not.toHaveProperty('creationTime');
    expect(Item).not.toHaveProperty('hash');
  });
});

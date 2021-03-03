const { RedirectUrl } = require('../../../src/models');
const crypto = require('crypto');
const setupTestAwsDynamoDB = require('../../utils/setupTestAwsDynamoDB');

describe('Redirect Url model', () => {
  let minify_id = '';
  beforeAll(() => {
    minify_id = crypto
      .randomBytes(10)
      .toString('base64')
      .match(/([a-zA-Z0-9]{7})/)[0];
      setupTestAwsDynamoDB(minify_id)
  });

  test('should work correctly and get the originalLink and expiration only as output', async ()=>{
      await expect(RedirectUrl.getOriginalUrl(minify_id)).resolves.;

  })
});

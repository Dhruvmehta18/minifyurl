const request = require('supertest');
const httpStatus = require('http-status');
const crypto = require('crypto');
const app = require('../../src/app');
const config = require('../../src/config/config');
const logger = require('../../src/config/logger');
const { setupTestAwsDynamoDB } = require('../utils/setupTestAwsDynamoDB');

const minifyId = crypto
  .randomBytes(16)
  .toString('base64')
  .match(/([a-zA-Z0-9]{7})/)[0];
logger.debug(minifyId);
setupTestAwsDynamoDB(minifyId);

describe('Hash routes', () => {
  describe('GET some minified link', () => {
    test('should return 404 when not found', async () => {
      config.env = 'production';
      const tempMinifyId = crypto
        .randomBytes(16)
        .toString('base64')
        .match(/([a-zA-Z0-9]{7})/)[0];
      await request(app).get(`/${tempMinifyId}`).expect(httpStatus.NOT_FOUND);
      config.env = process.env.NODE_ENV;
    });

    test('should return 301 moved permanently when found and set headers correctly', async () => {
      config.env = 'production';
      const res = await request(app).get(`/${minifyId}`).expect(httpStatus.MOVED_PERMANENTLY);
      expect(res.headers.location).toBeDefined();
      expect(res.headers['cache-control']).toBeDefined();
      expect(res.headers.location).toEqual('https://www.google.com');
      expect(res.headers['cache-control']).toEqual('private, max-age=90');
      expect(res.headers['content-security-policy']).toEqual(
        "default-src 'self';script-src 'self';object-src 'none';style-src 'self'"
      );
      config.env = process.env.NODE_ENV;
    });

    test('should throw Not found 400 error in production when minify validation failed', async () => {
      config.env = 'production';
      const tempMinifyId = crypto
        .randomBytes(16)
        .toString('base64')
        .match(/([a-zA-Z0-9]{2})/)[0];
      await request(app).get(`/${tempMinifyId}`).expect(httpStatus.BAD_REQUEST);
      config.env = process.env.NODE_ENV;
    });

    test('should throw Bad request 400 error when length of minifyId is less than three', async () => {
      config.env = 'production';
      const tempMinifyId = crypto
        .randomBytes(16)
        .toString('base64')
        .match(/([a-zA-Z0-9]{2})/)[0];
      await request(app).get(`/${tempMinifyId}`).expect(httpStatus.BAD_REQUEST);
      config.env = process.env.NODE_ENV;
    });

    test('should throw validation failed when the characters of minifyId contains other then number english characters underscore(_) and hyphen(-)', async () => {
      config.env = 'production';
      const tempMinifyId = 'pjH-k3487jd_l*';
      await request(app).get(`/${tempMinifyId}`).expect(httpStatus.BAD_REQUEST);
      config.env = process.env.NODE_ENV;
    });
  });
});

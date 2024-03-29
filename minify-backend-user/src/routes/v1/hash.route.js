const express = require('express');
const validate = require('../../middlewares/validate');
const hashValidation = require('../../validations/hash.validation');
const hashController = require('../../controllers/hash.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();
router.post('/minify', validate(hashValidation.createHashUrl), auth(), hashController.createUrl);
router.get('/queryUrl', auth(), hashController.queryUrls);
router.put('/id/update', validate(hashValidation.updateOriginalUrl), auth(), hashController.updateUrl);
router.delete('/id/delete/', validate(hashValidation.deleteUrl), auth(), hashController.deleteUrl);
router.get('/:minify_id', validate(hashValidation.getUrl), auth(), hashController.getUrl);

module.exports = router;

const express = require('express');
const validate = require('../../middlewares/validate');
const hashValidation = require('../../validations/hash.validation');
const hashController = require('../../controllers/hash.controller');

const router = express.Router();

router.get('/:minify_id', validate(hashValidation.getOriginalUrl), hashController.getUrl);

module.exports = router;

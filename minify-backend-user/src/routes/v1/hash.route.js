const express = require('express');
const validate = require('../../middlewares/validate');
const hashValidation = require('../../validations/hash.validation');
const hashController = require('../../controllers/hash.controller');

const router = express.Router();

router.post('/minify', validate(hashValidation.createHashUrl), hashController.createUrl);
router.get('/:minify_id', hashController.getUrl);

module.exports = router;
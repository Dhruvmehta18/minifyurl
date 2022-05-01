const express = require('express');
const validate = require('../../middlewares/validate');
const telemetryValidation = require('../../validations/telemetry.validation');
const telemetryController = require('../../controllers/telemetry.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();
router.get(
  '/qyeryTelemetry',
  validate(telemetryValidation.getTelemetryDataForMonth),
  auth(),
  telemetryController.getTelemetryDataOfMonth
);

module.exports = router;

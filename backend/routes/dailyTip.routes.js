const express = require('express');
const router = express.Router();
const { getDailyTip } = require('../controllers/dailyTip.controller');

router.get('/daily-tip', getDailyTip);

module.exports = router;

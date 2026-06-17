const express = require('express');
const { validateInput } = require('../middleware/validateInput');
const { submitFootprint, getHistory } = require('../controllers/footprint.controller');
const rateLimit = require('express-rate-limit');

const router = express.Router();

// Rate limiting specifically for the POST endpoint (which calls AI)
// 5 requests per 15 minutes per IP
const aiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 5, 
  message: { success: false, error: 'Too many requests. Please try again later.' }
});

router.post('/', aiLimiter, validateInput, submitFootprint);
router.get('/history', getHistory);

module.exports = router;

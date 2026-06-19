const express = require('express');
const router = express.Router();
const { register, login, getProfile } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.post('/auth/register', register);
router.post('/auth/login', login);
router.get('/auth/profile', protect, getProfile);

module.exports = router;

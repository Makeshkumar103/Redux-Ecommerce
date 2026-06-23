const express = require('express');
const router = express.Router();
const { register, login, forgotPassword, resetPassword, getProfile } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.post('/auth/register', register);
router.post('/auth/login', login);
router.post('/auth/forgot-password', forgotPassword);
router.put('/auth/reset-password/:token', resetPassword);
router.get('/auth/profile', protect, getProfile);

module.exports = router;

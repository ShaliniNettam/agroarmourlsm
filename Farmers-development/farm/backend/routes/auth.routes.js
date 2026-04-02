const express = require('express');
const router = express.Router();
const { register, login, getProfile, updateProfile, updatePreferences, changePassword } = require('../controllers/auth.controller');
const { auth } = require('../middleware/auth');

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);
router.put('/preferences', auth, updatePreferences);
router.put('/change-password', auth, changePassword);

module.exports = router;

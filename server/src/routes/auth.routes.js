const express = require('express');
const {
    register,
    login,
    getMe
} = require('../controllers/auth/auth.controller');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth.middleware');

// router.post('/register', protect, authorize('ADMIN'), register);
router.post('/register', register); // Temporarily public for initial admin setup
router.post('/login', login);
router.get('/profile', protect, getMe);

module.exports = router;

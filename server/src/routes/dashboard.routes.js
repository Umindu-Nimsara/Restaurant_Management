const express = require('express');
const { getStatistics } = require('../controllers/dashboard/dashboard.controller');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth.middleware');

router.use(protect);
router.use(authorize('ADMIN'));

router.get('/statistics', getStatistics);

module.exports = router;

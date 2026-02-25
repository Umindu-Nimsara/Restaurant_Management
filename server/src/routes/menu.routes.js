const express = require('express');
const {
    getCategories,
    createCategory
} = require('../controllers/menu/category.controller');
const {
    getMenuItems,
    getMenuItem,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem
} = require('../controllers/menu/menuItem.controller');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth.middleware');

// Categories
router.route('/categories')
    .get(getCategories)
    .post(protect, authorize('ADMIN'), createCategory);

// Menu Items
router.route('/items')
    .get(getMenuItems)
    .post(protect, authorize('ADMIN'), createMenuItem);

router.route('/items/:id')
    .get(getMenuItem)
    .put(protect, authorize('ADMIN'), updateMenuItem)
    .delete(protect, authorize('ADMIN'), deleteMenuItem);

module.exports = router;

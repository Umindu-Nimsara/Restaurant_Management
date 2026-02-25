const express = require('express');
const {
    getOrders,
    getOrder,
    createOrder,
    updateOrderStatus
} = require('../controllers/orders/order.controller');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth.middleware');

router.use(protect);

router.route('/')
    .get(getOrders)
    .post(authorize('ADMIN', 'WAITER'), createOrder);

router.route('/:id')
    .get(getOrder);

router.route('/:id/status')
    .put(authorize('ADMIN', 'CHEF', 'WAITER'), updateOrderStatus);

module.exports = router;

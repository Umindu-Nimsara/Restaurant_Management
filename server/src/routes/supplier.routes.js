const express = require('express');
const {
    getSuppliers,
    getSupplier,
    createSupplier,
    updateSupplier,
    deleteSupplier,
    createPurchase
} = require('../controllers/suppliers/supplier.controller');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth.middleware');

router.use(protect);
router.use(authorize('ADMIN'));

router.route('/')
    .get(getSuppliers)
    .post(createSupplier);

router.route('/:id')
    .get(getSupplier)
    .put(updateSupplier)
    .delete(deleteSupplier);

router.post('/:id/purchase', createPurchase);

module.exports = router;

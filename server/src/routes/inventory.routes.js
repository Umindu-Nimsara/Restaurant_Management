const express = require('express');
const {
    getIngredients,
    createIngredient,
    updateIngredient,
    deleteIngredient
} = require('../controllers/inventory/ingredient.controller');
const {
    addStockMovement,
    getIngredientStockMovements
} = require('../controllers/inventory/stock.controller');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth.middleware');

router.use(protect);
router.use(authorize('ADMIN', 'CHEF'));

// Ingredients
router.route('/ingredients')
    .get(getIngredients)
    .post(createIngredient);

router.route('/ingredients/:id')
    .put(updateIngredient)
    .delete(deleteIngredient);

// Stock Movements
router.route('/stock')
    .post(addStockMovement);

router.route('/stock/:ingredientId')
    .get(getIngredientStockMovements);

module.exports = router;

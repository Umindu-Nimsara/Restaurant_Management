const StockMovement = require('../../models/StockMovement.model');
const Ingredient = require('../../models/Ingredient.model');

// @desc    Add stock movement
// @route   POST /api/inventory/stock
// @access  Private/Admin
exports.addStockMovement = async (req, res, next) => {
    try {
        const { ingredientId, type, quantity, reason } = req.body;

        // Create movement
        const movement = await StockMovement.create({
            ingredientId,
            type,
            quantity,
            reason,
            staffId: req.user.id
        });

        // Update ingredient quantity
        const ingredient = await Ingredient.findById(ingredientId);
        if (!ingredient) {
            return res.status(404).json({
                success: false,
                error: 'Ingredient not found'
            });
        }

        if (type === 'PURCHASE' || type === 'ADJUSTMENT' && quantity > 0) {
            ingredient.quantity += Number(quantity);
        } else {
            ingredient.quantity -= Number(quantity);
        }

        await ingredient.save();

        res.status(201).json({
            success: true,
            data: movement
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Get stock movements for an ingredient
// @route   GET /api/inventory/stock/:ingredientId
// @access  Private/Admin
exports.getIngredientStockMovements = async (req, res, next) => {
    try {
        const movements = await StockMovement.find({ ingredientId: req.params.ingredientId }).populate('staffId', 'name');
        res.status(200).json({
            success: true,
            count: movements.length,
            data: movements
        });
    } catch (err) {
        next(err);
    }
};

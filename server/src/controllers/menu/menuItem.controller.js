const MenuItem = require('../../models/MenuItem.model');

// @desc    Get all menu items
// @route   GET /api/menu/items
// @access  Public
exports.getMenuItems = async (req, res, next) => {
    try {
        const items = await MenuItem.find().populate('categoryId', 'name');
        res.status(200).json({
            success: true,
            count: items.length,
            data: items
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Get single menu item
// @route   GET /api/menu/items/:id
// @access  Public
exports.getMenuItem = async (req, res, next) => {
    try {
        const item = await MenuItem.findById(req.params.id).populate('categoryId', 'name');

        if (!item) {
            return res.status(404).json({
                success: false,
                error: 'Menu item not found'
            });
        }

        res.status(200).json({
            success: true,
            data: item
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Create menu item
// @route   POST /api/menu/items
// @access  Private/Admin
exports.createMenuItem = async (req, res, next) => {
    try {
        const item = await MenuItem.create(req.body);
        res.status(201).json({
            success: true,
            data: item
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Update menu item
// @route   PUT /api/menu/items/:id
// @access  Private/Admin
exports.updateMenuItem = async (req, res, next) => {
    try {
        const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!item) {
            return res.status(404).json({
                success: false,
                error: 'Menu item not found'
            });
        }

        res.status(200).json({
            success: true,
            data: item
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Delete menu item
// @route   DELETE /api/menu/items/:id
// @access  Private/Admin
exports.deleteMenuItem = async (req, res, next) => {
    try {
        const item = await MenuItem.findByIdAndDelete(req.params.id);

        if (!item) {
            return res.status(404).json({
                success: false,
                error: 'Menu item not found'
            });
        }

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (err) {
        next(err);
    }
};

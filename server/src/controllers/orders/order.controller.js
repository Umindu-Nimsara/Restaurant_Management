const Order = require('../../models/Order.model');
const MenuItem = require('../../models/MenuItem.model');

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private
exports.getOrders = async (req, res, next) => {
    try {
        const orders = await Order.find().populate('staffId', 'name').populate('items.menuItemId', 'name price');
        res.status(200).json({
            success: true,
            count: orders.length,
            data: orders
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
exports.getOrder = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id).populate('staffId', 'name').populate('items.menuItemId', 'name price');

        if (!order) {
            return res.status(404).json({
                success: false,
                error: 'Order not found'
            });
        }

        res.status(200).json({
            success: true,
            data: order
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Create order
// @route   POST /api/orders
// @access  Private (Waiter/Admin)
exports.createOrder = async (req, res, next) => {
    try {
        const { tableId, items, paymentMethod } = req.body;

        let subtotal = 0;
        const orderItems = [];

        // Process items and calculate total
        for (const item of items) {
            const menuItem = await MenuItem.findById(item.menuItemId);
            if (!menuItem) {
                return res.status(404).json({
                    success: false,
                    error: `Menu item not found: ${item.menuItemId}`
                });
            }

            const itemTotal = menuItem.price * item.qty;
            subtotal += itemTotal;

            orderItems.push({
                menuItemId: item.menuItemId,
                name: menuItem.name,
                price: menuItem.price,
                qty: item.qty,
                note: item.note
            });
        }

        const total = subtotal; // Assuming no tax for now, can add later

        const order = await Order.create({
            tableId,
            staffId: req.user.id,
            items: orderItems,
            subtotal,
            total,
            paymentMethod
        });

        res.status(201).json({
            success: true,
            data: order
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private (Admin/Chef/Waiter)
exports.updateOrderStatus = async (req, res, next) => {
    try {
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(req.params.id, { status }, {
            new: true,
            runValidators: true
        });

        if (!order) {
            return res.status(404).json({
                success: false,
                error: 'Order not found'
            });
        }

        res.status(200).json({
            success: true,
            data: order
        });
    } catch (err) {
        next(err);
    }
};

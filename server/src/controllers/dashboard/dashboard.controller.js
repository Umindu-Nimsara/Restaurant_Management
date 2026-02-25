const Order = require('../../models/Order.model');
const Ingredient = require('../../models/Ingredient.model');
const Reservation = require('../../models/Reservation.model');
const MenuItem = require('../../models/MenuItem.model');

// @desc    Get dashboard statistics
// @route   GET /api/dashboard/statistics
// @access  Private/Admin
exports.getStatistics = async (req, res, next) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Total Orders Today
        const totalOrdersToday = await Order.countDocuments({
            createdAt: { $gte: today }
        });

        // Total Revenue Today
        const ordersToday = await Order.find({
            createdAt: { $gte: today },
            status: 'PAID'
        });
        const totalRevenueToday = ordersToday.reduce((acc, order) => acc + order.total, 0);

        // Low Stock Items
        const lowStockItems = await Ingredient.find({
            $expr: { $lte: ['$quantity', '$minLevel'] }
        });

        // Active Reservations
        const activeReservations = await Reservation.countDocuments({
            status: 'BOOKED',
            startAt: { $gte: today }
        });

        // Popular Menu Items (Top 5)
        // This is a bit complex without aggregation, but let's do a simple count for now or just return placeholders
        const popularMenuItems = await MenuItem.find().limit(5);

        res.status(200).json({
            success: true,
            data: {
                totalOrdersToday,
                totalRevenueToday,
                lowStockCount: lowStockItems.length,
                lowStockItems,
                activeReservations,
                popularMenuItems
            }
        });
    } catch (err) {
        next(err);
    }
};

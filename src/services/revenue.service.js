import RevenueEvent from '../models/RevenueEvent.js';
import Order from '../models/Order.js';

export const getRevenueOverview = async (tenantId, period = 'month') => {
    // Determine date range
    const now = new Date();
    let startDate = new Date();
    if (period === 'month') startDate.setMonth(now.getMonth() - 1);
    else if (period === 'week') startDate.setDate(now.getDate() - 7);

    const events = await RevenueEvent.find({
        organizationId: tenantId,
        createdAt: { $gte: startDate }
    });

    const totalRevenue = events.reduce((sum, e) => sum + (e.grossAmount || 0), 0);
    const totalOrderCount = await Order.countDocuments({
        organizationId: tenantId,
        orderDate: { $gte: startDate }
    });

    return {
        totalRevenue,
        totalOrders: totalOrderCount,
        period,
        startDate
    };
};

export const getDisbursements = async (tenantId) => {
    // Placeholder for fetching disbursement records
    return [];
};

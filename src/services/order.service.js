import Order from '../models/Order.js';
import { ApiError } from '../utils/ApiError.js';

export const listOrders = async (tenantId, options = {}) => {
    const { page = 1, limit = 20 } = options;
    const skip = (page - 1) * limit;

    return Order.find({ organizationId: tenantId })
        .sort({ orderDate: -1 })
        .skip(skip)
        .limit(limit);
};

export const getOrderById = async (tenantId, orderId) => {
    const order = await Order.findOne({ _id: orderId, organizationId: tenantId });
    if (!order) throw new ApiError(404, 'Order not found');
    return order;
};

export const updateOrder = async (tenantId, orderId, data) => {
    const order = await Order.findOneAndUpdate(
        { _id: orderId, organizationId: tenantId },
        data,
        { new: true }
    );
    if (!order) throw new ApiError(404, 'Order not found');
    return order;
};

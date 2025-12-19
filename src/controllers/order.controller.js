import * as orderService from '../services/order.service.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const list = asyncHandler(async (req, res) => {
    const { data } = await orderService.listOrders(req.tenantId, req.query);

    // Map to the exact structure in the contract
    const formattedData = data.map(order => ({
        _id: order._id,
        customer: {
            name: order.customerId?.name || 'Unknown',
            email: order.customerId?.email || 'Unknown'
        },
        totalAmount: order.totalAmount,
        status: order.status,
        createdAt: order.createdAt
    }));

    res.json({ data: formattedData });
});

export const getById = asyncHandler(async (req, res) => {
    const order = await orderService.getOrderById(req.tenantId, req.params.id);
    res.json(new ApiResponse(true, order));
});

export const update = asyncHandler(async (req, res) => {
    const order = await orderService.updateOrder(req.tenantId, req.params.id, req.body);
    res.json(new ApiResponse(true, order));
});

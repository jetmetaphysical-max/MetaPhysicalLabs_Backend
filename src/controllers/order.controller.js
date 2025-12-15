import * as orderService from '../services/order.service.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const list = asyncHandler(async (req, res) => {
    const orders = await orderService.listOrders(req.tenantId, req.query);
    res.json(new ApiResponse(true, orders));
});

export const getById = asyncHandler(async (req, res) => {
    const order = await orderService.getOrderById(req.tenantId, req.params.id);
    res.json(new ApiResponse(true, order));
});

export const update = asyncHandler(async (req, res) => {
    const order = await orderService.updateOrder(req.tenantId, req.params.id, req.body);
    res.json(new ApiResponse(true, order));
});

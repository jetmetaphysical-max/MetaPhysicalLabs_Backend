import * as revenueService from '../services/revenue.service.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getOverview = asyncHandler(async (req, res) => {
    const { period } = req.query;
    const data = await revenueService.getRevenueOverview(req.tenantId, period);
    res.json(new ApiResponse(true, data));
});

export const getDisbursements = asyncHandler(async (req, res) => {
    const data = await revenueService.getDisbursements(req.tenantId);
    res.json(new ApiResponse(true, data));
});

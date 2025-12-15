import * as customerService from '../services/customer.service.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const list = asyncHandler(async (req, res) => {
    const customers = await customerService.listCustomers(req.tenantId, req.query);
    res.json(new ApiResponse(true, customers));
});

export const getById = asyncHandler(async (req, res) => {
    const customer = await customerService.getCustomerById(req.tenantId, req.params.id);
    res.json(new ApiResponse(true, customer));
});

export const update = asyncHandler(async (req, res) => {
    const customer = await customerService.updateCustomer(req.tenantId, req.params.id, req.body);
    res.json(new ApiResponse(true, customer));
});

export const exportCustomers = asyncHandler(async (req, res) => {
    // Placeholder for export
    res.json(new ApiResponse(true, { message: "Export started" }));
});

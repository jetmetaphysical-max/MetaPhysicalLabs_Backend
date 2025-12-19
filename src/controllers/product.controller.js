import * as productService from '../services/product.service.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const list = asyncHandler(async (req, res) => {
    const { data, total } = await productService.listProducts(req.tenantId, req.query);
    res.json({
        data,
        pagination: { total }
    });
});

export const create = asyncHandler(async (req, res) => {
    const product = await productService.createProduct(req.tenantId, req.body);
    res.status(201).json(new ApiResponse(true, product));
});

export const getById = asyncHandler(async (req, res) => {
    const product = await productService.getProductById(req.tenantId, req.params.id);
    res.json(new ApiResponse(true, product));
});

export const update = asyncHandler(async (req, res) => {
    const product = await productService.updateProduct(req.tenantId, req.params.id, req.body);
    res.json(new ApiResponse(true, product));
});

export const remove = asyncHandler(async (req, res) => {
    await productService.deleteProduct(req.tenantId, req.params.id);
    res.status(204).send();
});

export const sync = asyncHandler(async (req, res) => {
    // Placeholder for sync logic
    res.json(new ApiResponse(true, { message: "Sync started" }));
});

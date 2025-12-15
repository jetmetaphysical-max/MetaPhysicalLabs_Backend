import Product from '../models/Product.js';
import { ApiError } from '../utils/ApiError.js';

export const listProducts = async (tenantId, options = {}) => {
    const { page = 1, limit = 20 } = options;
    const skip = (page - 1) * limit;

    return Product.find({ organizationId: tenantId })
        .skip(skip)
        .limit(limit);
};

export const createProduct = async (tenantId, data) => {
    return Product.create({ ...data, organizationId: tenantId });
};

export const getProductById = async (tenantId, productId) => {
    const product = await Product.findOne({ _id: productId, organizationId: tenantId });
    if (!product) throw new ApiError(404, 'Product not found');
    return product;
};

export const updateProduct = async (tenantId, productId, data) => {
    const product = await Product.findOneAndUpdate(
        { _id: productId, organizationId: tenantId },
        data,
        { new: true }
    );
    if (!product) throw new ApiError(404, 'Product not found');
    return product;
};

export const deleteProduct = async (tenantId, productId) => {
    const product = await Product.findOneAndDelete({ _id: productId, organizationId: tenantId });
    if (!product) throw new ApiError(404, 'Product not found');
    return product;
};

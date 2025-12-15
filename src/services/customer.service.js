import Customer from '../models/Customer.js';
import { ApiError } from '../utils/ApiError.js';

export const listCustomers = async (tenantId, options = {}) => {
    const { page = 1, limit = 20 } = options;
    const skip = (page - 1) * limit;

    return Customer.find({ organizationId: tenantId })
        .skip(skip)
        .limit(limit);
};

export const getCustomerById = async (tenantId, customerId) => {
    const customer = await Customer.findOne({ _id: customerId, organizationId: tenantId });
    if (!customer) throw new ApiError(404, 'Customer not found');
    return customer;
};

export const updateCustomer = async (tenantId, customerId, data) => {
    const customer = await Customer.findOneAndUpdate(
        { _id: customerId, organizationId: tenantId },
        data,
        { new: true }
    );
    if (!customer) throw new ApiError(404, 'Customer not found');
    return customer;
};

import Organization from '../models/Organization.js';
import { ApiError } from '../utils/ApiError.js';

export const tenantContext = async (req, res, next) => {
    try {
        if (!req.tenantId) {
            throw new ApiError(401, 'No organization context');
        }

        const organization = await Organization.findById(req.tenantId);

        if (!organization) {
            throw new ApiError(404, 'Organization not found');
        }

        if (organization.subscription?.status === 'cancelled') {
            throw new ApiError(403, 'Organization subscription is cancelled');
        }

        req.organization = organization;
        next();
    } catch (error) {
        next(error);
    }
};

import { ApiError } from '../utils/ApiError.js';

const roleHierarchy = {
    viewer: 1,
    editor: 2,
    admin: 3,
    owner: 4,
};

export const requireRole = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return next(new ApiError(401, 'Authentication required'));
        }

        const userRole = req.user.role;

        if (!allowedRoles.includes(userRole)) {
            return next(new ApiError(403, 'Insufficient permissions'));
        }

        next();
    };
};

export const requireMinRole = (minRole) => {
    return (req, res, next) => {
        if (!req.user) {
            return next(new ApiError(401, 'Authentication required'));
        }

        const userRole = req.user.role;
        const userLevel = roleHierarchy[userRole] || 0;
        const requiredLevel = roleHierarchy[minRole] || 0;

        if (userLevel < requiredLevel) {
            return next(new ApiError(403, 'Insufficient permissions'));
        }

        next();
    };
};

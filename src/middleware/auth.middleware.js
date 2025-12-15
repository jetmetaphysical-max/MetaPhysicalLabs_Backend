import { auth } from '../config/auth.js';
import User from '../models/User.js';
import { ApiError } from '../utils/ApiError.js';

export const authenticate = async (req, res, next) => {
    try {
        const session = await auth.api.getSession({
            headers: req.headers
        });

        if (!session) {
            throw new ApiError(401, 'Authentication required');
        }

        const { user } = session;

        if (!user) {
            throw new ApiError(401, 'Authentication required');
        }

        // Fetch full user from our DB to get role and organizationId
        const dbUser = await User.findOne({ email: user.email });

        if (!dbUser) {
            throw new ApiError(401, 'User not found');
        }

        if (dbUser.status !== 'active') {
            throw new ApiError(403, 'User account is not active');
        }

        req.user = dbUser;

        // Set tenantId if organizationId exists (may not exist for newly registered users)
        if (dbUser.organizationId) {
            req.tenantId = dbUser.organizationId.toString();
        }

        next();
    } catch (error) {
        if (error instanceof ApiError) {
            next(error);
        } else {
            next(new ApiError(401, 'Invalid or expired token'));
        }
    }
};

export const optionalAuth = async (req, res, next) => {
    try {
        const session = await auth.api.getSession({
            headers: req.headers
        });

        if (session && session.user) {
            const dbUser = await User.findOne({ email: session.user.email });
            if (dbUser && dbUser.status === 'active') {
                req.user = dbUser;
                req.tenantId = dbUser.organizationId.toString();
            }
        }
        next();
    } catch {
        next();
    }
};

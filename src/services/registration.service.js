import User from '../models/User.js';
import Organization from '../models/Organization.js';
import { ApiError } from '../utils/ApiError.js';
import { generateSlug } from '../utils/helpers.js';

/**
 * Post-registration setup after Better Auth creates a user
 * Creates a default organization and links it to the user
 */
export const setupNewUser = async (email, name) => {
    try {
        // Find the user created by Better Auth
        let user = await User.findOne({ email });

        if (!user) {
            throw new ApiError(404, 'User not found after registration');
        }

        // Check if user already has an organization
        if (user.organizationId) {
            return { user, organization: await Organization.findById(user.organizationId) };
        }

        // Create default organization for new user
        const orgName = `${name}'s Organization`;
        const orgSlug = await generateSlug(orgName, 'system'); // System context for initial slug

        const organization = await Organization.create({
            name: orgName,
            slug: orgSlug,
            plan: 'free'
        });

        // Update user with organizationId and role
        user.organizationId = organization._id;
        user.role = 'owner';
        await user.save();

        return { user, organization };
    } catch (error) {
        throw error instanceof ApiError ? error : new ApiError(500, 'Failed to setup new user');
    }
};

/**
 * Handle post-registration webhook from Better Auth
 */
export const handleRegistrationWebhook = async (userData) => {
    const { email, name } = userData;
    return await setupNewUser(email, name);
};

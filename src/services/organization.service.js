import Organization from '../models/Organization.js';
import User from '../models/User.js';
import { ApiError } from '../utils/ApiError.js';

export const getOrganization = async (orgId) => {
    const org = await Organization.findById(orgId);
    if (!org) throw new ApiError(404, 'Organization not found');
    return org;
};

export const updateOrganization = async (orgId, data) => {
    const org = await Organization.findByIdAndUpdate(orgId, data, { new: true });
    if (!org) throw new ApiError(404, 'Organization not found');
    return org;
};

export const getMembers = async (orgId) => {
    return User.find({ organizationId: orgId }).select('-password');
};

export const inviteMember = async (orgId, inviterId, { email, role }) => {
    // Logic to invite member (create user with invited status, send email)
    // For now, minimal implementation
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new ApiError(409, 'User already exists');

    // Create invited user placeholder... implementation details depend on specific auth flow
    return { message: "Invitation sent (mock)" };
}

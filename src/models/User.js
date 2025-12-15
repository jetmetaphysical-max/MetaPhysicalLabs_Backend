import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        email: { type: String, required: true },
        name: { type: String, required: true },
        avatar: String,
        organizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
        role: {
            type: String,
            enum: ['owner', 'admin', 'editor', 'viewer'],
            default: 'viewer',
        },
        emailVerified: { type: Boolean, default: false },
        authProvider: {
            type: String,
            enum: ['email', 'google', 'github'],
            default: 'email',
        },
        status: {
            type: String,
            enum: ['active', 'invited', 'disabled'],
            default: 'active',
        },
        invitedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        invitedAt: Date,
        lastLoginAt: Date,
        preferences: {
            notifications: {
                email: { type: Boolean, default: true },
                inApp: { type: Boolean, default: true },
            },
            timezone: String,
            language: String,
        },
    },
    { timestamps: true }
);

UserSchema.index({ organizationId: 1, email: 1 }, { unique: true });
UserSchema.index({ email: 1 });
UserSchema.index({ organizationId: 1, role: 1 });

const User = mongoose.model('User', UserSchema);
export default User;

import mongoose from 'mongoose';

const OrganizationSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        slug: { type: String, required: true, unique: true, lowercase: true },
        plan: {
            type: String,
            enum: ['free', 'starter', 'pro', 'enterprise'],
            default: 'free',
        },
        subscription: {
            status: {
                type: String,
                enum: ['active', 'trialing', 'past_due', 'cancelled'],
                default: 'active',
            },
            stripeCustomerId: String,
            stripeSubscriptionId: String,
            currentPeriodEnd: Date,
        },
        settings: {
            logo: String,
            primaryColor: String,
            secondaryColor: String,
            customDomain: String,
        },
        limits: {
            maxProjects: { type: Number, default: 3 },
            maxManuals: { type: Number, default: 5 },
            maxStorage: { type: Number, default: 500 * 1024 * 1024 }, // 500MB
            maxTeamMembers: { type: Number, default: 2 },
        },
        usage: {
            projectCount: { type: Number, default: 0 },
            manualCount: { type: Number, default: 0 },
            storageUsed: { type: Number, default: 0 },
            monthlyScans: { type: Number, default: 0 },
        },
    },
    { timestamps: true }
);

// OrganizationSchema.index({ slug: 1 }); // Removed to prevent duplicate index warning

OrganizationSchema.index({ 'subscription.status': 1 });

const Organization = mongoose.model('Organization', OrganizationSchema);
export default Organization;

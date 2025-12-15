import mongoose from 'mongoose';

const CustomerSchema = new mongoose.Schema(
    {
        organizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
        email: { type: String, required: true },
        name: String,
        phone: String,
        address: {
            line1: String,
            line2: String,
            city: String,
            state: String,
            postalCode: String,
            country: String,
        },
        channel: {
            type: String,
            enum: ['qr_scan', 'direct', 'shopify', 'woocommerce', 'email'],
            default: 'qr_scan',
        },
        firstManualId: { type: mongoose.Schema.Types.ObjectId, ref: 'Manual' },
        firstQrCodeId: { type: mongoose.Schema.Types.ObjectId, ref: 'QRCode' },
        registrationStatus: {
            type: String,
            enum: ['anonymous', 'lead', 'registered'],
            default: 'anonymous',
        },
        registeredAt: Date,
        stats: {
            totalOrders: { type: Number, default: 0 },
            totalSpent: { type: Number, default: 0 },
            lastOrderAt: Date,
            manualViews: { type: Number, default: 0 },
            lastViewAt: Date,
        },
        isRepeat: { type: Boolean, default: false },
        tags: [String],
        notes: String,
        marketingConsent: { type: Boolean, default: false },
        consentedAt: Date,
        externalIds: {
            shopify: String,
            woocommerce: String,
        },
    },
    { timestamps: true }
);

CustomerSchema.index({ organizationId: 1, email: 1 }, { unique: true });
CustomerSchema.index({ organizationId: 1, channel: 1 });
CustomerSchema.index({ organizationId: 1, isRepeat: 1 });

const Customer = mongoose.model('Customer', CustomerSchema);
export default Customer;

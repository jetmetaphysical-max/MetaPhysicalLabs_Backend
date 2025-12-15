import mongoose from 'mongoose';

const RevenueEventSchema = new mongoose.Schema({
    organizationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true,
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true,
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    type: {
        type: String,
        enum: ['product_sale', 'upsell', 'protection_plan'],
        required: true,
    },
    grossAmount: Number,
    platformFeePercent: Number,
    platformFee: Number,
    netAmount: Number,
    currency: {
        type: String,
        default: 'USD',
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'refunded'],
        default: 'pending',
    },
    disbursementId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Disbursement',
    },
    disbursedAt: Date,
}, { timestamps: true });

RevenueEventSchema.index({ organizationId: 1, status: 1 });
RevenueEventSchema.index({ organizationId: 1, createdAt: -1 });

export default mongoose.models.RevenueEvent || mongoose.model('RevenueEvent', RevenueEventSchema);

import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
    {
        organizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
        orderNumber: { type: String, required: true },
        source: {
            type: String,
            enum: ['manual', 'shopify', 'woocommerce'],
            default: 'manual',
        },
        externalOrderId: String,
        customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
        customer: {
            name: { type: String, required: true },
            email: { type: String, required: true },
            phone: String,
            address: {
                line1: String,
                line2: String,
                city: String,
                state: String,
                postalCode: String,
                country: String,
            },
        },
        items: [
            {
                productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
                name: { type: String, required: true },
                sku: String,
                quantity: { type: Number, required: true },
                unitPrice: { type: Number, required: true },
                totalPrice: { type: Number, required: true },
            },
        ],
        totals: {
            subtotal: { type: Number, required: true },
            discount: { type: Number, default: 0 },
            discountCode: String,
            shipping: { type: Number, default: 0 },
            tax: { type: Number, default: 0 },
            total: { type: Number, required: true },
        },
        attribution: {
            manualId: { type: mongoose.Schema.Types.ObjectId, ref: 'Manual' },
            qrCodeId: { type: mongoose.Schema.Types.ObjectId, ref: 'QRCode' },
            stepIndex: Number,
            sessionId: String,
        },
        offerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Offer' },
        status: {
            type: String,
            enum: ['pending', 'processing', 'completed', 'cancelled', 'refunded'],
            default: 'pending',
        },
        fulfillment: {
            status: String,
            trackingNumber: String,
            carrier: String,
            shippedAt: Date,
            deliveredAt: Date,
        },
        orderDate: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

OrderSchema.index({ organizationId: 1, status: 1, orderDate: -1 });
OrderSchema.index({ organizationId: 1, orderNumber: 1 });
OrderSchema.index({ 'attribution.manualId': 1 });
OrderSchema.index({ source: 1, externalOrderId: 1 });

const Order = mongoose.model('Order', OrderSchema);
export default Order;

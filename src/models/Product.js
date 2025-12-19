import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
    {
        organizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
        source: {
            type: String,
            enum: ['manual', 'shopify', 'woocommerce'],
            default: 'manual',
        },
        externalId: String,
        name: { type: String, required: true },
        description: String,
        price: { type: Number, required: true },
        compareAtPrice: Number,
        currency: { type: String, default: 'USD' },
        sku: String,
        barcode: String,
        images: [String], // Aligned with spec: ["string"]
        inventory: { type: Number, default: 0 }, // Aligned with spec: number
        inventoryStatus: {
            type: String,
            enum: ['in_stock', 'low', 'out'],
            default: 'in_stock',
        },
        status: {
            type: String,
            enum: ['active', 'draft', 'pending', 'completed'], // Including both spec and legacy
            default: 'active',
        },
        category: String,
        tags: [String],
        isActive: { type: Boolean, default: true },
        metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
        assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
    { timestamps: true }
);

ProductSchema.index({ organizationId: 1, isActive: 1 });
ProductSchema.index({ organizationId: 1, source: 1, externalId: 1 });
ProductSchema.index({ organizationId: 1, sku: 1 });

// Update inventory status before save
ProductSchema.pre('save', function (next) {
    if (this.inventory === 0) {
        this.inventoryStatus = 'out';
    } else if (this.inventory <= 10) { // Default low threshold
        this.inventoryStatus = 'low';
    } else {
        this.inventoryStatus = 'in_stock';
    }
    next();
});

const Product = mongoose.model('Product', ProductSchema);
export default Product;

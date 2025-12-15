// Minimal implementation for Offer Service
// Note: Offer model was not explicitly asked for in detailed separate file in initial prompt but routes/controllers imply it.
// I will create a basic mock service if no model exists, or just basic CRUD if it does.
// Oh wait, Offer model was listed in user's prompt index but not details. Wait, let me check prompt.
// Prompt "Database Models" section did NOT have Offer model detail, but "Project Structure" had Offer.ts.
// And "Route Index" had offerRoutes.
// I'll assume standard CRUD. I'll need to define a schema in code or just use Mongoose generic if allowed, 
// but sticking to "User Request" I should have created Offer.js if it was in the file list.
// In my `Database Models` step I created `Integration.js` etc but missed `Offer.js`?
// Let me check my own previous output.
// I did NOT create Offer.js. I should create it now to support the service.

import mongoose from 'mongoose';
import { ApiError } from '../utils/ApiError.js';

// Create Model first since it was missing
const OfferSchema = new mongoose.Schema({
    organizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
    name: { type: String, required: true },
    type: { type: String, enum: ['percentage', 'fixed'], default: 'percentage' },
    value: { type: Number, required: true },
    code: String,
    isActive: { type: Boolean, default: true },
    startsAt: Date,
    endsAt: Date
}, { timestamps: true });

export const Offer = mongoose.models.Offer || mongoose.model('Offer', OfferSchema);

export const listOffers = async (tenantId) => {
    return Offer.find({ organizationId: tenantId });
}

export const createOffer = async (tenantId, data) => {
    return Offer.create({ ...data, organizationId: tenantId });
}

export const getOfferById = async (tenantId, offerId) => {
    const offer = await Offer.findOne({ _id: offerId, organizationId: tenantId });
    if (!offer) throw new ApiError(404, 'Offer not found');
    return offer;
}

export const updateOffer = async (tenantId, offerId, data) => {
    const offer = await Offer.findOneAndUpdate({ _id: offerId, organizationId: tenantId }, data, { new: true });
    if (!offer) throw new ApiError(404, 'Offer not found');
    return offer;
}

export const deleteOffer = async (tenantId, offerId) => {
    const offer = await Offer.findOneAndDelete({ _id: offerId, organizationId: tenantId });
    if (!offer) throw new ApiError(404, 'Offer not found');
    return offer;
}

import * as offerService from '../services/offer.service.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const list = asyncHandler(async (req, res) => {
    const offers = await offerService.listOffers(req.tenantId);
    res.json(new ApiResponse(true, offers));
});

export const create = asyncHandler(async (req, res) => {
    const offer = await offerService.createOffer(req.tenantId, req.body);
    res.status(201).json(new ApiResponse(true, offer));
});

export const getById = asyncHandler(async (req, res) => {
    const offer = await offerService.getOfferById(req.tenantId, req.params.id);
    res.json(new ApiResponse(true, offer));
});

export const update = asyncHandler(async (req, res) => {
    const offer = await offerService.updateOffer(req.tenantId, req.params.id, req.body);
    res.json(new ApiResponse(true, offer));
});

export const remove = asyncHandler(async (req, res) => {
    await offerService.deleteOffer(req.tenantId, req.params.id);
    res.status(204).send();
});

export const pause = asyncHandler(async (req, res) => {
    const offer = await offerService.updateOffer(req.tenantId, req.params.id, { isActive: false });
    res.json(new ApiResponse(true, offer));
});

export const resume = asyncHandler(async (req, res) => {
    const offer = await offerService.updateOffer(req.tenantId, req.params.id, { isActive: true });
    res.json(new ApiResponse(true, offer));
});

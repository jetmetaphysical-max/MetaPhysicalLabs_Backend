import { Router } from 'express';
import { setupNewUser } from '../services/registration.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = Router();

/**
 * POST /setup - Complete user setup after Better Auth registration
 * Called by frontend after successful Better Auth sign-up
 * Creates organization and links to authenticated user
 */
router.post('/setup', authenticate, asyncHandler(async (req, res) => {
    const { email, name } = req.user;
    const result = await setupNewUser(email, name);
    res.status(200).json(new ApiResponse(true, result));
}));

export default router;

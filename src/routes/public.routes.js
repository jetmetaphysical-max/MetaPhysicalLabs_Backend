import { Router } from 'express';
import * as publicController from '../controllers/public.controller.js';
// Public routes do NOT use auth middleware

const router = Router();

router.get('/m/:shortCode', publicController.getManualByShortCode);
router.post('/m/:shortCode/lead', publicController.captureLead);
// View tracking can be handled here or via analytics route
// router.post('/m/:shortCode/view', publicController.trackView);

export default router;

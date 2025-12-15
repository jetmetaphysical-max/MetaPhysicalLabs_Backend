import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import { tenantContext } from '../middleware/tenant.middleware.js';
import { requireRole } from '../middleware/role.middleware.js';
import * as revenueController from '../controllers/revenue.controller.js';

const router = Router();

router.use(authenticate, tenantContext, requireRole('owner', 'admin'));

router.get('/overview', revenueController.getOverview);
router.get('/disbursements', revenueController.getDisbursements);

export default router;

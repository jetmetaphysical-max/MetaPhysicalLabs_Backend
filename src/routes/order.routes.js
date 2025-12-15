import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import { tenantContext } from '../middleware/tenant.middleware.js';
import { requireMinRole } from '../middleware/role.middleware.js';
import * as orderController from '../controllers/order.controller.js';

const router = Router();

router.use(authenticate, tenantContext);

router.get('/', orderController.list);
router.get('/:id', orderController.getById);
router.patch('/:id', requireMinRole('editor'), orderController.update);

export default router;

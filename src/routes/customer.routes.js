import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import { tenantContext } from '../middleware/tenant.middleware.js';
import { requireMinRole } from '../middleware/role.middleware.js';
import * as customerController from '../controllers/customer.controller.js';

const router = Router();

router.use(authenticate, tenantContext);

router.get('/', customerController.list);
router.get('/:id', customerController.getById);
router.patch('/:id', requireMinRole('editor'), customerController.update);
router.post('/export', requireMinRole('admin'), customerController.exportCustomers);

export default router;

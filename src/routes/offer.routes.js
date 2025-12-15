import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import { tenantContext } from '../middleware/tenant.middleware.js';
import { requireMinRole } from '../middleware/role.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
import { offerValidator } from '../validators/offer.validator.js';
import * as offerController from '../controllers/offer.controller.js';

const router = Router();

router.use(authenticate, tenantContext);

router.get('/', offerController.list);
router.post('/', requireMinRole('admin'), validate(offerValidator.create), offerController.create);
router.get('/:id', offerController.getById);
router.patch('/:id', requireMinRole('admin'), validate(offerValidator.update), offerController.update);
router.delete('/:id', requireMinRole('admin'), offerController.remove);
router.post('/:id/pause', requireMinRole('admin'), offerController.pause);
router.post('/:id/resume', requireMinRole('admin'), offerController.resume);

export default router;

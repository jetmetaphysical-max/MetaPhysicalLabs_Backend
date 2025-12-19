import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import { tenantContext } from '../middleware/tenant.middleware.js';
import { requireMinRole } from '../middleware/role.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
import { assetValidator } from '../validators/asset.validator.js';
import * as assetController from '../controllers/asset.controller.js';

const router = Router();

router.use(authenticate, tenantContext);

router.get('/3d', assetController.list);
router.post('/3d', requireMinRole('editor'), validate(assetValidator.create), assetController.create);
router.get('/3d/:id', assetController.getById);
router.patch('/3d/:id', requireMinRole('editor'), validate(assetValidator.update), assetController.update);
router.delete('/3d/:id', requireMinRole('admin'), assetController.remove);

export default router;

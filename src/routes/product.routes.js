import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import { tenantContext } from '../middleware/tenant.middleware.js';
import { requireMinRole } from '../middleware/role.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
import { productValidator } from '../validators/product.validator.js';
import * as productController from '../controllers/product.controller.js';

const router = Router();

router.use(authenticate, tenantContext);

router.get('/', productController.list);
router.post('/', requireMinRole('editor'), validate(productValidator.create), productController.create);
router.get('/:id', productController.getById);
router.patch('/:id', requireMinRole('editor'), validate(productValidator.update), productController.update);
router.delete('/:id', requireMinRole('admin'), productController.remove);
router.post('/sync', requireMinRole('admin'), productController.sync);

export default router;

import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import { tenantContext } from '../middleware/tenant.middleware.js';
import { requireRole } from '../middleware/role.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
import { organizationValidator } from '../validators/organization.validator.js';
import * as orgController from '../controllers/organization.controller.js';

const router = Router();

router.use(authenticate, tenantContext);

router.get('/current', orgController.get);
router.patch('/current', requireRole('owner', 'admin'), validate(organizationValidator.update), orgController.update);
router.get('/current/members', orgController.getMembers);
router.post('/current/members/invite', requireRole('owner', 'admin'), validate(organizationValidator.inviteMember), orgController.inviteMember);

export default router;

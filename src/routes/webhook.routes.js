import { Router } from 'express';
import * as webhookController from '../controllers/webhook.controller.js';

const router = Router();

router.post('/shopify', webhookController.handleShopify);
router.post('/woocommerce', webhookController.handleWooCommerce);
router.post('/stripe', webhookController.handleStripe);

export default router;

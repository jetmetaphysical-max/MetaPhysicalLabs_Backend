import { Router } from 'express';
import registrationRoutes from './registration.routes.js';
import organizationRoutes from './organization.routes.js';
import projectRoutes from './project.routes.js';
import manualRoutes from './manual.routes.js';
import productRoutes from './product.routes.js';
import orderRoutes from './order.routes.js';
import customerRoutes from './customer.routes.js';
import offerRoutes from './offer.routes.js';
import assetRoutes from './asset.routes.js';
import qrcodeRoutes from './qrcode.routes.js';
import integrationRoutes from './integration.routes.js';
import webhookRoutes from './webhook.routes.js';
import subscriptionRoutes from './subscription.routes.js';
import revenueRoutes from './revenue.routes.js';
import analyticsRoutes from './analytics.routes.js';

const router = Router();

// Auth is handled by Better Auth at /api/auth/*
// Registration setup endpoint for post-signup organization creation
router.use('/registration', registrationRoutes);
router.use('/organizations', organizationRoutes);
// router.use('/projects', projectRoutes);
// router.use('/manuals', manualRoutes);
router.use('/products', productRoutes);
router.use('/orders', orderRoutes);
router.use('/customers', customerRoutes);
router.use('/offers', offerRoutes);
// router.use('/assets', assetRoutes);
// router.use('/qr-codes', qrcodeRoutes);
// router.use('/integrations', integrationRoutes);
// router.use('/webhooks', webhookRoutes);
// router.use('/subscriptions', subscriptionRoutes);
router.use('/revenue', revenueRoutes);
// router.use('/analytics', analyticsRoutes);

export default router;






// router.use('/projects', projectRoutes);


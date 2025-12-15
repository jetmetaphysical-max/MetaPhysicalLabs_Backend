import Organization from './Organization.js';
import User from './User.js';
import Project from './Project.js';
import Manual from './Manual.js';
import Asset3D from './Asset3D.js';
import QRCode from './QRCode.js';
import Product from './Product.js';
import Order from './Order.js';
import Customer from './Customer.js';
import Integration from './Integration.js';
import BrandAsset from './BrandAsset.js';
import RevenueEvent from './RevenueEvent.js';
import { ManualView, ProductClick } from './Analytics.js';
// Add other models as they are created
import { Offer } from '../services/offer.service.js'; // Offer was defined in service, maybe move to models?
// For now let's just export what we have in models dir

export {
    Organization,
    User,
    // Project,
    // Manual,
    // Asset3D,
    // QRCode,
    // Product,
    // Order,
    // Customer,
    // Integration,
    // BrandAsset,
    // RevenueEvent,
    // ManualView,
    // ProductClick
};

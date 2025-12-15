import Stripe from 'stripe';
import { ApiError } from '../utils/ApiError.js';
import Organization from '../models/Organization.js';
import Order from '../models/Order.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (tenantId, { priceId, plan, successUrl, cancelUrl }) => {
    // Determine mode based on plan type or price
    // Simplified: if plan is provided, it's a subscription, otherwise one-time payment
    const mode = plan ? 'subscription' : 'payment';

    // Get organization to link customer
    const org = await Organization.findById(tenantId);
    let customerId = org.stripeCustomerId;

    if (!customerId) {
        const customer = await stripe.customers.create({
            email: org.email, // Assuming org has email or use generic contact
            metadata: { organizationId: tenantId }
        });
        customerId = customer.id;
        org.stripeCustomerId = customerId;
        await org.save();
    }

    const session = await stripe.checkout.sessions.create({
        customer: customerId,
        payment_method_types: ['card'],
        line_items: [
            {
                price: priceId,
                quantity: 1,
            },
        ],
        mode,
        success_url: successUrl,
        cancel_url: cancelUrl,
        metadata: {
            organizationId: tenantId,
            plan
        }
    });

    return session;
};

export const createPortalSession = async (tenantId) => {
    const org = await Organization.findById(tenantId);
    if (!org.stripeCustomerId) throw new ApiError(400, 'No billing account found');

    const session = await stripe.billingPortal.sessions.create({
        customer: org.stripeCustomerId,
        return_url: `${process.env.FRONTEND_URL}/billing`, // Default return
    });

    return session;
};

export const handleWebhook = async (body, signature) => {
    let event;
    try {
        event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        throw new ApiError(400, `Webhook Error: ${err.message}`);
    }

    switch (event.type) {
        case 'checkout.session.completed': {
            const session = event.data.object;
            const { organizationId, plan } = session.metadata;

            if (organizationId && plan) {
                await Organization.findByIdAndUpdate(organizationId, {
                    'subscription.plan': plan,
                    'subscription.status': 'active',
                    'subscription.stripeSubscriptionId': session.subscription
                });
            }
            break;
        }
        case 'customer.subscription.updated':
        case 'customer.subscription.deleted': {
            const subscription = event.data.object;
            const status = subscription.status;
            // Find org by subscription ID (would need to query or store customer->org mapping)
            // Simplified:
            const customerId = subscription.customer;
            await Organization.findOneAndUpdate({ stripeCustomerId: customerId }, {
                'subscription.status': status
            });
            break;
        }
        // Handle other events like payment_intent.succeeded for Orders
    }

    return { received: true };
};

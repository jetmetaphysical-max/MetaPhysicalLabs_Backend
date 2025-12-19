import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import { rateLimit } from 'express-rate-limit';

import routes from './routes/index.js';
import { errorHandler } from './middleware/error.middleware.js';

const app = express();

// Security
app.use(helmet());
app.use(cors({
    origin: [process.env.FRONTEND_URL || 'http://localhost:3000', 'http://localhost:3002', 'http://localhost:3003'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']
}));

// Rate limiting
app.use(rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 100, // 100 requests per minute
}));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Better Auth Handler
import { toNodeHandler } from "better-auth/node";
import { auth } from "./config/auth.js";

// Custom redirect for Google Auth to match frontend contract
const handleGoogleAuthRedirect = (req, res) => {
    // We redirect to Better Auth's internal social login, 
    // but tell it to callback to our success handler on the backend first
    const successUrl = `${process.env.BETTER_AUTH_URL}/v1/auth/google/success`;
    res.redirect(`${process.env.BETTER_AUTH_URL}/api/auth/login/social/google?callbackURL=${successUrl}`);
};

// Option B & Standard redirect
app.get("/api/auth/google", handleGoogleAuthRedirect);
// Allow the frontend to call the social login directly but still intercept
app.get("/api/auth/login/social/google", (req, res, next) => {
    // If it's already going to our successUrl, let it pass
    if (req.query.callbackURL && req.query.callbackURL.includes('/v1/auth/google/success')) {
        return next();
    }
    // Otherwise, redirect through our logic to ensure token delivery
    handleGoogleAuthRedirect(req, res);
});

// Option A (v1 prefix) support
app.get("/v1/auth/login/social/google", handleGoogleAuthRedirect);

// Alias for session verification to match frontend contract
app.get("/api/auth/session", (req, res, next) => {
    req.url = "/api/auth/get-session";
    next();
});

app.get("/v1/auth/google/success", async (req, res) => {
    try {
        // At this point, Better Auth has set the session cookie
        const session = await auth.api.getSession({
            headers: req.headers
        });

        if (session && session.session) {
            const token = session.session.token;
            const email = session.user.email;

            // Per contract, we redirect back to the frontend
            // We'll check the Referer or use a default list to support 3000/3003
            const referer = req.headers.referer || '';
            const frontendUrl = referer.includes('3003') ? 'http://localhost:3003' : 'http://localhost:3000';

            // Redirect back to frontend with token and email as query params per contract
            return res.redirect(`${frontendUrl}/?token=${token}&email=${email}`);
        }

        // Fallback if session not found
        console.warn('Google Auth Success: Session not found');
        res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/login?error=session_not_found`);
    } catch (error) {
        console.error('Error in Google Auth success handler:', error);
        res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/login?error=auth_failed`);
    }
});

app.all("/api/auth/*", toNodeHandler(auth));

import publicRoutes from './routes/public.routes.js';

// API routes
app.use('/v1', publicRoutes); // Mounts /v1/m/:shortCode
app.use('/v1', routes);


// Error handling
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Route not found' },
    });
});

export default app;

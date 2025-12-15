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
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
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

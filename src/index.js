import 'dotenv/config';
import app from './app.js';
import { connectDB } from './config/database.js';
import { connectRedis } from './config/redis.js';
import { logger } from './utils/logger.js';

const PORT = process.env.PORT || 3001;

const start = async () => {
    try {
        // Connect to MongoDB
        await connectDB();
        // logger.info('Connected to MongoDB'); // Logged in connectDB

        // Connect to Redis
        // await connectRedis();
        // logger.info('Connected to Redis'); // Logged in connectRedis

        // Start server
        app.listen(PORT, () => {
            logger.info(`Server running on port ${PORT}`);
        });
    } catch (error) {
        logger.error('Failed to start server:', error);
        process.exit(1);
    }
};

start();

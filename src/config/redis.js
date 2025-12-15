import Redis from 'ioredis';
import { logger } from '../utils/logger.js';

let redisClient;

export const connectRedis = async () => {
    if (!process.env.REDIS_URL) {
        logger.warn('REDIS_URL not found, skipping Redis connection');
        return;
    }

    try {
        redisClient = new Redis(process.env.REDIS_URL);

        redisClient.on('connect', () => {
            logger.info('Redis Connected');
        });

        redisClient.on('error', (err) => {
            logger.error('Redis Client Error', err);
        });

    } catch (error) {
        logger.error('Failed to connect to Redis', error);
    }
};

export { redisClient };

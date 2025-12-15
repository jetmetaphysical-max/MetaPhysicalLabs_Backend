import { z } from 'zod';

export const offerValidator = {
    create: z.object({
        name: z.string().min(2),
        discount: z.number().min(0).max(100),
        code: z.string().optional()
    }),
    update: z.object({
        name: z.string().min(2).optional(),
        discount: z.number().min(0).max(100).optional(),
    })
};

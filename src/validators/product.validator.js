import { z } from 'zod';

export const productValidator = {
    create: z.object({
        name: z.string().min(2),
        price: z.number().min(0),
        description: z.string().optional(),
        sku: z.string().optional(),
        inventory: z.object({
            quantity: z.number().min(0)
        }).optional()
    }),
    update: z.object({
        name: z.string().min(2).optional(),
        price: z.number().min(0).optional(),
        description: z.string().optional(),
    })
};

import { z } from 'zod';

export const authValidator = {
    register: z.object({
        email: z.string().email(),
        password: z.string().min(8),
        name: z.string().min(2),
    }),
    login: z.object({
        email: z.string().email(),
        password: z.string(),
    }),
    forgotPassword: z.object({
        email: z.string().email(),
    }),
    resetPassword: z.object({
        token: z.string(),
        password: z.string().min(8),
    }),
};

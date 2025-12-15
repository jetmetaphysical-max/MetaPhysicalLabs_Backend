import { z } from 'zod';

export const organizationValidator = {
    update: z.object({
        name: z.string().min(2).optional(),
        settings: z.object({
            primaryColor: z.string().optional(),
            secondaryColor: z.string().optional(),
            logo: z.string().optional(),
        }).optional(),
    }),
    inviteMember: z.object({
        email: z.string().email(),
        role: z.enum(['admin', 'editor', 'viewer']),
    }),
};

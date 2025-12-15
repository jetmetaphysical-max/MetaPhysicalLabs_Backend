import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY);

export const emailConfig = {
    from: 'Acme <onboarding@resend.dev>', // Update with verify domain in prod
};

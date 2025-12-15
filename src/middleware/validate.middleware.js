import { ApiError } from '../utils/ApiError.js';

export const validate = (schema) => {
    return (req, res, next) => {
        try {
            schema.parse({
                body: req.body,
                query: req.query,
                params: req.params,
            });
            next();
        } catch (error) {
            // Zod error handling
            const errors = error.errors?.map((e) => ({
                field: e.path.join('.'),
                message: e.message,
            }));
            next(new ApiError(422, 'Validation failed', errors));
        }
    };
};

import { nanoid } from 'nanoid';
import slugify from 'slugify';
import Project from '../models/Project.js';

export const generateShortCode = (length = 8) => {
    return nanoid(length);
};

export const generateSlug = async (name, organizationId) => {
    let slug = slugify(name, { lower: true, strict: true });

    // Check if slug exists
    let exists = await Project.findOne({ organizationId, slug });
    let counter = 1;

    while (exists) {
        slug = `${slugify(name, { lower: true, strict: true })}-${counter}`;
        exists = await Project.findOne({ organizationId, slug });
        counter++;
    }

    return slug;
};

export const paginate = (page, limit) => {
    const skip = (page - 1) * limit;
    return { skip, limit };
};

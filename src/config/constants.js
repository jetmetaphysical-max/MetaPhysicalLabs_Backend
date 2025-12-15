export const ROLES = {
    OWNER: 'owner',
    ADMIN: 'admin',
    EDITOR: 'editor',
    VIEWER: 'viewer'
};

export const PLANS = {
    FREE: 'free',
    STARTER: 'starter',
    PRO: 'pro',
    ENTERPRISE: 'enterprise'
};

export const DEFAULT_LIMITS = {
    free: {
        maxProjects: 3,
        maxManuals: 5,
        maxStorage: 500 * 1024 * 1024,
        maxTeamMembers: 2
    },
    starter: {
        maxProjects: 10,
        maxManuals: 20,
        maxStorage: 5 * 1024 * 1024 * 1024,
        maxTeamMembers: 5
    },
    pro: {
        maxProjects: 50,
        maxManuals: 100,
        maxStorage: 50 * 1024 * 1024 * 1024,
        maxTeamMembers: 20
    },
    enterprise: {
        maxProjects: 9999,
        maxManuals: 9999,
        maxStorage: 1000 * 1024 * 1024 * 1024,
        maxTeamMembers: 9999
    }
};

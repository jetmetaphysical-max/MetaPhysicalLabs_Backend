const logger = {
    info: (...args) => {
        if (process.env.NODE_ENV !== 'test') {
            console.log(new Date().toISOString(), '[INFO]', ...args);
        }
    },
    error: (...args) => {
        if (process.env.NODE_ENV !== 'test') {
            console.error(new Date().toISOString(), '[ERROR]', ...args);
        }
    },
    warn: (...args) => {
        if (process.env.NODE_ENV !== 'test') {
            console.warn(new Date().toISOString(), '[WARN]', ...args);
        }
    },
    debug: (...args) => {
        if (process.env.NODE_ENV === 'development') {
            console.debug(new Date().toISOString(), '[DEBUG]', ...args);
        }
    }
};

export { logger };

import dotenv from 'dotenv';
dotenv.config();

function getEnv(name, fallback = undefined, required = false) {
    const value = process.env[name] || fallback;
    if (required && !value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }
    return value;
}

export default {
    PORT: getEnv('PORT', 3000, true),
    SESSION_SECRET: getEnv('SESSION_SECRET', '', true),
    DB_USER: getEnv('DB_USER', '', true),
    DB_HOST: getEnv('DB_HOST', 'localhost', true),
    DB_PASSWORD: getEnv('DB_PASSWORD', '', true),
    DB_NAME: getEnv('DB_NAME', '', true)
};
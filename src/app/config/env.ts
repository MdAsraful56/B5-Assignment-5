import dotenv from 'dotenv';

dotenv.config();

interface EnvConfig {
    PORT: string;
    MONGODB_URL: string;
    NODE_ENV: string;
    JWT_ACCESS_TOKEN_SECRET: string;
    JWT_ACCESS_EXPIRATION_TIME: string;
    JWT_REFRESH_TOKEN_SECRET: string;
    JWT_REFRESH_EXPIRATION_TIME: string;
    BCRYPT_SALT_ROUNDS: string;
    ADMIN_EMAIL: string;
    ADMIN_PASSWORD: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    GOOGLE_CALLBACK_URL: string;
    EXPRESS_SESSION_SECRET: string;
    FRONTEND_URL: string;
}

const loadEnvVariables = (): EnvConfig => {
    const requiredEnvVariables = [
        'PORT',
        'MONGODB_URL',
        'NODE_ENV',
        'JWT_ACCESS_TOKEN_SECRET',
        'JWT_ACCESS_EXPIRATION_TIME',
        'JWT_REFRESH_TOKEN_SECRET',
        'JWT_REFRESH_EXPIRATION_TIME',
        'BCRYPT_SALT_ROUNDS',
        'ADMIN_EMAIL',
        'ADMIN_PASSWORD',
        'GOOGLE_CLIENT_ID',
        'GOOGLE_CLIENT_SECRET',
        'GOOGLE_CALLBACK_URL',
        'EXPRESS_SESSION_SECRET',
        'FRONTEND_URL',
    ];

    requiredEnvVariables.forEach((key) => {
        if (!process.env[key]) {
            throw new Error(`Missing required environment variable: ${key}`);
        }
    });
    return {
        PORT: process.env.PORT as string,
        MONGODB_URL: process.env.MONGODB_URL as string,
        NODE_ENV: process.env.NODE_ENV as string,
        JWT_ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET as string,
        JWT_ACCESS_EXPIRATION_TIME: process.env
            .JWT_ACCESS_EXPIRATION_TIME as string,
        JWT_REFRESH_TOKEN_SECRET: process.env
            .JWT_REFRESH_TOKEN_SECRET as string,
        JWT_REFRESH_EXPIRATION_TIME: process.env
            .JWT_REFRESH_EXPIRATION_TIME as string,
        BCRYPT_SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS as string,
        ADMIN_EMAIL: process.env.ADMIN_EMAIL as string,
        ADMIN_PASSWORD: process.env.ADMIN_PASSWORD as string,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,
        GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL as string,
        EXPRESS_SESSION_SECRET: process.env.EXPRESS_SESSION_SECRET as string,
        FRONTEND_URL: process.env.FRONTEND_URL as string,
    };
};

export const envVars = loadEnvVariables();

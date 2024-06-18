import { env } from '@/utils/env';

export const jwtSecret = env.APP_JWT_SCRET;
export const jwtExpiresIn = '1h'; // Token akan kedaluwarsa dalam 1 jam

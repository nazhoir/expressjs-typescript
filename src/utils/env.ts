import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();
export const EnvSchema = z.object({
  // DATABASE_URL: z.string({
  //     description: 'CosmosDB Connection string',
  //     required_error: '😱 You forgot to add a database URL',
  //   })
  //   .min(3),
  NODE_ENV: z
    .enum(['development', 'test', 'production'], {
      description: 'This gets updated depending on your environment',
    })
    .default('development'),
  APP_PORT: z.coerce
    .number({
      description: '.env files convert numbers to strings, therefoore we have to enforce them to be numbers',
    })
    .positive()
    .max(65536, `options.port should be >= 0 and < 65536`)
    .default(3000),
  APP_COOKIE_SECRET: z
    .string({
      description: 'Cookie Secret for the Aplication',
      required_error: '😱 You forgot to add a Cookie Secret',
    })
    .min(3, {
      message: 'Cookie Secret min 3',
    }),
  APP_JWT_SCRET: z
    .string({
      description: 'JWT Secret for the Aplication',
      required_error: '😱 You forgot to add a JWT Secret',
    })
    .min(3, {
      message: 'JWT Secret min 3',
    }),
});

export const env = EnvSchema.parse({
  // DATABASE_URL: process.env.DATABASE_URL,
  NODE_ENV: process.env.NODE_ENV,
  APP_PORT: process.env.APP_PORT,
  APP_COOKIE_SECRET: process.env.APP_COOKIE_SECRET,
  APP_JWT_SCRET: process.env.APP_JWT_SCRET,
});

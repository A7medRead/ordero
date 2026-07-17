import { config } from 'dotenv';
import { defineConfig } from 'prisma/config';

// حمّل ملف .env من جذر المشروع
config({
  path: '../../.env',
});

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: process.env.DATABASE_URL!,
  },
});
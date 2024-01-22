import { config } from 'dotenv';
import * as process from 'process';
import { DataSource } from 'typeorm';

config({
  path: '.env.local',
});
// dotenv.config({
//   path: '.env.local',
// });

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  migrations: ['src/custom-config/database/migrations/*{.ts,.js}'],
  migrationsTableName: 'ws_migrations',
  synchronize: false,
});

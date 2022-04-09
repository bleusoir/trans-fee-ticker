import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';

const config = new ConfigService();

export const AppDataSource = new DataSource({
  type: 'mariadb',
  host: config.get('DB_HOST'),
  port: config.get('DB_PORT'),
  username: config.get('DB_USER'),
  password: config.get('DB_PASS'),
  database: config.get('DB_NAME'),
  entities: ['dist/**/*.entity.js'],
  synchronize: false,
});
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { ConfigService } from '@nestjs/config';

const config = new ConfigService();

const ormconfig: TypeOrmModuleOptions = {
  type: 'mariadb',
  host: config.get('DB_HOST'),
  port: config.get('DB_PORT'),
  username: config.get('DB_USER'),
  password: config.get('DB_PASS'),
  database: config.get('DB_NAME'),
  entities: ['dist/**/*.entity.js'],
  synchronize: false,
  ssl: false,
  logging: process.env.NODE_ENV === 'dev',
  keepConnectionAlive: false,
  namingStrategy: new SnakeNamingStrategy(),
  subscribers: ['src/subscriber/**/*.ts'],
  migrations: [__dirname + '/database/migrations/**/*.ts'],
  migrationsTableName: 'migrations',
  cli: {
    entitiesDir: __dirname + '/**/*.entity.{js,ts}',
    migrationsDir: __dirname + '/database/migrations/',
    subscribersDir: 'src/subscriber',
  },
};

// noinspection JSUnusedGlobalSymbols
export default ormconfig;
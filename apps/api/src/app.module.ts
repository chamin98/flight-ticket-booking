import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { FeaturesModule } from './features/features.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../../.env',
      isGlobal: true,
      cache: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'web', 'dist', 'browser'),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'flight-db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    FeaturesModule,
  ],
})
export class AppModule {}

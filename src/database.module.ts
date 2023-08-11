import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './auth/user.entity';
import { Character } from './todo/entities/character.entity';
import { Section } from './todo/entities/section.entity';
import { Todo } from './todo/entities/todo.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('DB_HOST'),
        port: config.get('DB_PORT'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_DATABASE'),
        entities: [User, Character, Section, Todo],
        synchronize: true,
        charset: 'utf8_general_ci',
      }),
    }),
  ],
})
export class DatabaseModule {}

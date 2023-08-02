import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { Character } from './entities/character.entity';
import { Section } from './entities/section.entity';
import { Todo } from './entities/todo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Character, Section, Todo])],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}

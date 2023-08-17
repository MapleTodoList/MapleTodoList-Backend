import { Controller, Get, Post, Put, Patch, Body, Param } from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('/todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Put('/')
  updataTodoIsClear(
    @Body('character') character,
    @Body('section') section,
    @Body('todo') todo,
  ) {
    this.todoService.updateTodoIsClear(character, section, todo);
  }

  @Post('/')
  getCharacters(@Body('token') token) {
    return this.todoService.getCharacters(token);
  }

  @Post('/character')
  addCharacter(@Body('name') name, @Body('token') token) {
    this.todoService.addCharacter(name, token);
  }

  @Patch('/character')
  updataCharacter(@Body('character') character, @Body('to') to) {
    this.todoService.updateCharacter(character, to);
  }

  @Get('/:character')
  getInfo(@Param('character') character) {
    return this.todoService.getAllInfo(character);
  }

  @Post('/section')
  addSection(
    @Body('character') character,
    @Body('name') name,
    @Body('reset') reset,
    @Body('whenReset') whenReset,
  ) {
    this.todoService.addSection(character, name, reset, whenReset);
  }

  @Patch('/section')
  updataSection(
    @Body('character') character,
    @Body('section') section,
    @Body('field') field,
    @Body('to') to,
  ) {
    this.todoService.updateSection(character, section, field, to);
  }

  @Put('/section')
  deleteSection(@Body('character') character, @Body('section') section) {
    this.todoService.deleteSection(character, section);
  }

  @Post('/todo')
  addTodo(
    @Body('section') section,
    @Body('name') name,
    @Body('number') number,
  ) {
    this.todoService.addTodo(section, name, number);
  }

  @Patch('/todo')
  updataTodo(
    @Body('character') character,
    @Body('section') section,
    @Body('todo') todo,
    @Body('field') field,
    @Body('to') to,
  ) {
    this.todoService.updateTodo(character, section, todo, field, to);
  }

  @Put('/todo')
  deleteTodo(
    @Body('character') character,
    @Body('section') section,
    @Body('todo') todo,
  ) {
    this.todoService.deleteTodo(character, section, todo);
  }
}

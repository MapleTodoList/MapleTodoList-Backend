import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Character } from './entities/character.entity';
import { Section } from './entities/section.entity';
import { Todo } from './entities/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Character)
    private readonly characterRepo: Repository<Character>,
    @InjectRepository(Section)
    private readonly sectionRepo: Repository<Section>,
    @InjectRepository(Todo)
    private readonly todoRepo: Repository<Todo>,
  ) {}

  async addCharacter(name, accessToken) {
    const user = await this.userRepo.findOneBy({ accessToken: accessToken });
    const newCharacter = await this.characterRepo.create({
      user,
      name,
    });
    await this.characterRepo.save(newCharacter);
    this.firstAddCharacter(name);
  }

  async addSection(ch, name, reset, whenReset) {
    const character = await this.characterRepo.findOneBy({ name: ch });
    console.log(character);
    const newSection = await this.sectionRepo.create({
      character,
      name,
      reset,
      whenReset,
    });
    await this.sectionRepo.save(newSection);
  }

  async addTodo(se, name, number) {
    const isClear = 0;
    const section = await this.sectionRepo.findOneBy({ name: se });
    const newTodo = await this.todoRepo.create({
      section,
      name,
      number,
      isClear,
    });
    await this.todoRepo.save(newTodo);
  }

  async firstAddCharacter(name) {
    await this.addSection(name, '일일 컨텐츠', 'daily', 'everyday');
    await this.addSection(name, '일일 보스', 'daily', 'everyday');
    await this.addSection(name, '일일 심볼', 'daily', 'everyday');
    await this.addSection(name, '주간 심볼', 'weekly', 'monday');
    await this.addSection(name, '주간 컨텐츠', 'weekly', 'monday');
    await this.addSection(name, '주간 보스', 'weekly', 'thursday');
    await this.addSection(name, '월간 보스', 'monthly', 'firstOfMonth');

    await this.addTodo('일일 컨텐츠', '데일리 기프트', 1);
    await this.addTodo('일일 컨텐츠', '몬스터 파크', 1);
    await this.addTodo('일일 컨텐츠', '마일리지 적립', 1);
    await this.addTodo('일일 컨텐츠', '유니온 코인', 1);
    await this.addTodo('일일 컨텐츠', '더 시드', 1);

    await this.addTodo('일일 보스', '우르스', 1);
    await this.addTodo('일일 보스', '자쿰', 1);
    await this.addTodo('일일 보스', '매그너스', 1);
    await this.addTodo('일일 보스', '힐라', 1);
    await this.addTodo('일일 보스', '카웅', 1);
    await this.addTodo('일일 보스', '파풀라투스', 1);
    await this.addTodo('일일 보스', '루타비스', 1);
    await this.addTodo('일일 보스', '반 레온', 1);
    await this.addTodo('일일 보스', '혼테일', 1);
    await this.addTodo('일일 보스', '아카이럼', 1);
    await this.addTodo('일일 보스', '핑크빈', 1);

    await this.addTodo('일일 심볼', '소멸의 여로', 1);
    await this.addTodo('일일 심볼', '츄츄 아일랜드', 1);
    await this.addTodo('일일 심볼', '레헬른', 1);
    await this.addTodo('일일 심볼', '아르카나', 1);
    await this.addTodo('일일 심볼', '모라스', 1);
    await this.addTodo('일일 심볼', '에스페라', 1);
    await this.addTodo('일일 심볼', '세르니움', 1);
    await this.addTodo('일일 심볼', '아르크스', 1);
    await this.addTodo('일일 심볼', '오디움', 1);
    await this.addTodo('일일 심볼', '도원경', 1);

    await this.addTodo('주간 심볼', '에르다 스펙트럼', 1);
    await this.addTodo('주간 심볼', '배고픈 무토', 1);
    await this.addTodo('주간 심볼', '미드나잇 체이서', 1);
    await this.addTodo('주간 심볼', '스피릿 세이비어', 1);
    await this.addTodo('주간 심볼', '엔하임 디펜스', 1);
    await this.addTodo('주간 심볼', '프로텍트 에스페라', 1);

    await this.addTodo('주간 컨텐츠', '무릉 도장', 1);
    await this.addTodo('주간 컨텐츠', '플래그 레이스', 1);
    await this.addTodo('주간 컨텐츠', '지하 수로', 1);
    await this.addTodo('주간 컨텐츠', '야영지 주간 임무', 1);
    await this.addTodo('주간 컨텐츠', '헤이븐 주간 임무', 1);

    await this.addTodo('주간 보스', '자쿰', 1);
    await this.addTodo('주간 보스', '매그너스', 1);
    await this.addTodo('주간 보스', '힐라', 1);
    await this.addTodo('주간 보스', '파풀라투스', 1);
    await this.addTodo('주간 보스', '피에르', 1);
    await this.addTodo('주간 보스', '반반', 1);
    await this.addTodo('주간 보스', '블러디 퀸', 1);
    await this.addTodo('주간 보스', '벨룸', 1);
    await this.addTodo('주간 보스', '핑크빈', 1);
    await this.addTodo('주간 보스', '시그너스', 1);
    await this.addTodo('주간 보스', '스우', 1);
    await this.addTodo('주간 보스', '데미안', 1);
    await this.addTodo('주간 보스', '가디언 엔젤 슬라임', 1);
    await this.addTodo('주간 보스', '루시드', 1);
    await this.addTodo('주간 보스', '윌', 1);
    await this.addTodo('주간 보스', '거대 괴수 더스크', 1);
    await this.addTodo('주간 보스', '진 힐라', 1);
    await this.addTodo('주간 보스', '친위대장 듄켈', 1);
    await this.addTodo('주간 보스', '선택받은 세렌', 1);
    await this.addTodo('주간 보스', '감시자 칼로스', 1);
    await this.addTodo('주간 보스', '카링', 1);

    await this.addTodo('월간 보스', '검은 마법사', 1);
  }

  async getAllInfo(characterName) {
    const character = await this.characterRepo.findOne({
      where: { name: characterName },
      relations: ['section'],
    });

    const characterWithSectionsAndTodos = await Promise.all(
      character.section.map(async (section) => {
        const todos = await this.todoRepo.find({ where: { section } });
        const todosWithValues = todos.map((todo) => ({
          name: todo.name,
          number: todo.number,
          isClear: todo.isClear,
        }));
        return {
          section,
          todos: todosWithValues,
        };
      }),
    );

    return {
      todoInfo: characterWithSectionsAndTodos,
    };
  }

  async updateTodoIsClear(characterName, sectionName, todoName) {
    const character = await this.characterRepo.findOne({
      where: { name: characterName },
      relations: ['section'],
    });

    const section = character.section.find((sec) => sec.name === sectionName);

    const todo = await this.todoRepo.findOne({
      where: { section, name: todoName },
    });

    todo.isClear += 1;
    if (todo.isClear > todo.number) {
      todo.isClear = 0;
    }

    await this.todoRepo.save(todo);
  }

  async updateCharacter(characterName, to) {
    const character = await this.characterRepo.findOne({
      where: { name: characterName },
    });

    character.name = to;

    await this.characterRepo.save(character);
  }

  async updateSection(characterName, sectionName, field, to) {
    const character = await this.characterRepo.findOne({
      where: { name: characterName },
      relations: ['section'],
    });

    const section = character.section.find((sec) => sec.name === sectionName);

    section[field] = to;

    await this.sectionRepo.save(section);
  }

  async updateTodo(characterName, sectionName, todoName, field, to) {
    const character = await this.characterRepo.findOne({
      where: { name: characterName },
      relations: ['section'],
    });

    const section = character.section.find((sec) => sec.name === sectionName);

    const todo = await this.todoRepo.findOne({
      where: { section, name: todoName },
    });

    todo[field] = to;

    await this.todoRepo.save(todo);
  }
}

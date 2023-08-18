import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
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
    try {
      const user = await this.userRepo.findOne({ where: { accessToken } });
      if (!user) {
        throw new Error('사용자를 찾을 수 없습니다');
      }

      const newCharacter = await this.characterRepo.create({
        user,
        name,
      });

      await this.characterRepo.save(newCharacter);

      await this.firstAddCharacter(name);
    } catch (error) {
      throw new Error('캐릭터 추가 중 오류가 발생했습니다');
    }
  }

  async addSection(ch, name, reset, whenReset) {
    try {
      const character = await this.characterRepo.findOne({
        where: { name: ch },
      });
      if (!character) {
        throw new Error('캐릭터를 찾을 수 없습니다');
      }

      const newSection = await this.sectionRepo.create({
        character,
        name,
        reset,
        whenReset,
      });

      await this.sectionRepo.save(newSection);
    } catch (error) {
      throw new Error('섹션 추가 중 오류가 발생했습니다');
    }
  }

  async addTodo(characterName, sectionName, todoName, todoNumber) {
    try {
      const character = await this.characterRepo.findOne({
        where: { name: characterName },
      });
      if (!character) {
        throw new Error('캐릭터를 찾을 수 없습니다');
      }

      const section = await this.sectionRepo.findOne({
        where: { character, name: sectionName },
      });
      if (!section) {
        throw new Error('섹션을 찾을 수 없습니다');
      }

      const newTodo = this.todoRepo.create({
        section,
        name: todoName,
        number: todoNumber,
        isClear: 0,
      });

      await this.todoRepo.save(newTodo);
    } catch (error) {
      throw new Error('할 일 추가 중 오류가 발생했습니다');
    }
  }

  async firstAddCharacter(name) {
    await this.addSection(name, '일일 컨텐츠', 'daily', 'everyday');
    await this.addSection(name, '일일 보스', 'daily', 'everyday');
    await this.addSection(name, '일일 심볼', 'daily', 'everyday');
    await this.addSection(name, '주간 심볼', 'weekly', 'monday');
    await this.addSection(name, '주간 컨텐츠', 'weekly', 'monday');
    await this.addSection(name, '주간 보스', 'weekly', 'thursday');
    await this.addSection(name, '월간 보스', 'monthly', 'firstOfMonth');

    await this.addTodo(name, '일일 컨텐츠', '데일리 기프트', 1);
    await this.addTodo(name, '일일 컨텐츠', '몬스터 파크', 1);
    await this.addTodo(name, '일일 컨텐츠', '마일리지 적립', 1);
    await this.addTodo(name, '일일 컨텐츠', '유니온 코인', 1);
    await this.addTodo(name, '일일 컨텐츠', '더 시드', 1);

    await this.addTodo(name, '일일 보스', '우르스', 1);
    await this.addTodo(name, '일일 보스', '자쿰', 1);
    await this.addTodo(name, '일일 보스', '매그너스', 1);
    await this.addTodo(name, '일일 보스', '힐라', 1);
    await this.addTodo(name, '일일 보스', '카웅', 1);
    await this.addTodo(name, '일일 보스', '파풀라투스', 1);
    await this.addTodo(name, '일일 보스', '루타비스', 1);
    await this.addTodo(name, '일일 보스', '반 레온', 1);
    await this.addTodo(name, '일일 보스', '혼테일', 1);
    await this.addTodo(name, '일일 보스', '아카이럼', 1);
    await this.addTodo(name, '일일 보스', '핑크빈', 1);

    await this.addTodo(name, '일일 심볼', '소멸의 여로', 1);
    await this.addTodo(name, '일일 심볼', '츄츄 아일랜드', 1);
    await this.addTodo(name, '일일 심볼', '레헬른', 1);
    await this.addTodo(name, '일일 심볼', '아르카나', 1);
    await this.addTodo(name, '일일 심볼', '모라스', 1);
    await this.addTodo(name, '일일 심볼', '에스페라', 1);
    await this.addTodo(name, '일일 심볼', '세르니움', 1);
    await this.addTodo(name, '일일 심볼', '아르크스', 1);
    await this.addTodo(name, '일일 심볼', '오디움', 1);
    await this.addTodo(name, '일일 심볼', '도원경', 1);
    await this.addTodo(name, '일일 심볼', '아르테리아', 1);
    await this.addTodo(name, '일일 심볼', '카르시온', 1);

    await this.addTodo(name, '주간 심볼', '에르다 스펙트럼', 1);
    await this.addTodo(name, '주간 심볼', '배고픈 무토', 1);
    await this.addTodo(name, '주간 심볼', '미드나잇 체이서', 1);
    await this.addTodo(name, '주간 심볼', '스피릿 세이비어', 1);
    await this.addTodo(name, '주간 심볼', '엔하임 디펜스', 1);
    await this.addTodo(name, '주간 심볼', '프로텍트 에스페라', 1);

    await this.addTodo(name, '주간 컨텐츠', '무릉 도장', 1);
    await this.addTodo(name, '주간 컨텐츠', '플래그 레이스', 1);
    await this.addTodo(name, '주간 컨텐츠', '지하 수로', 1);
    await this.addTodo(name, '주간 컨텐츠', '야영지 주간 임무', 1);
    await this.addTodo(name, '주간 컨텐츠', '헤이븐 주간 임무', 1);

    await this.addTodo(name, '주간 보스', '자쿰', 1);
    await this.addTodo(name, '주간 보스', '매그너스', 1);
    await this.addTodo(name, '주간 보스', '힐라', 1);
    await this.addTodo(name, '주간 보스', '파풀라투스', 1);
    await this.addTodo(name, '주간 보스', '피에르', 1);
    await this.addTodo(name, '주간 보스', '반반', 1);
    await this.addTodo(name, '주간 보스', '블러디 퀸', 1);
    await this.addTodo(name, '주간 보스', '벨룸', 1);
    await this.addTodo(name, '주간 보스', '핑크빈', 1);
    await this.addTodo(name, '주간 보스', '시그너스', 1);
    await this.addTodo(name, '주간 보스', '스우', 1);
    await this.addTodo(name, '주간 보스', '데미안', 1);
    await this.addTodo(name, '주간 보스', '가디언 엔젤 슬라임', 1);
    await this.addTodo(name, '주간 보스', '루시드', 1);
    await this.addTodo(name, '주간 보스', '윌', 1);
    await this.addTodo(name, '주간 보스', '거대 괴수 더스크', 1);
    await this.addTodo(name, '주간 보스', '진 힐라', 1);
    await this.addTodo(name, '주간 보스', '친위대장 듄켈', 1);
    await this.addTodo(name, '주간 보스', '선택받은 세렌', 1);
    await this.addTodo(name, '주간 보스', '감시자 칼로스', 1);
    await this.addTodo(name, '주간 보스', '카링', 1);

    await this.addTodo(name, '월간 보스', '검은 마법사', 1);
  }

  async getCharacters(accessToken) {
    try {
      const user = await this.userRepo.findOne({ where: { accessToken } });

      if (!user) {
        throw new Error('사용자를 찾을 수 없습니다');
      }

      const characters = await this.characterRepo.find({ where: { user } });

      return characters;
    } catch (error) {
      throw new Error('캐릭터 정보를 가져오는 중 오류가 발생했습니다');
    }
  }

  async getAllInfo(characterName) {
    try {
      const character = await this.characterRepo.findOne({
        where: { name: characterName },
        relations: ['section'],
      });

      if (!character) {
        throw new Error('캐릭터를 찾을 수 없습니다');
      }

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
    } catch (error) {
      throw new Error('캐릭터 정보를 가져오는 중 오류가 발생했습니다');
    }
  }

  async updateTodoIsClear(characterName, sectionName, todoName) {
    try {
      const character = await this.characterRepo.findOne({
        where: { name: characterName },
        relations: ['section'],
      });

      if (!character) {
        throw new Error('캐릭터를 찾을 수 없습니다');
      }

      const section = character.section.find((sec) => sec.name === sectionName);

      if (!section) {
        throw new Error('섹션을 찾을 수 없습니다');
      }

      const todo = await this.todoRepo.findOne({
        where: { section, name: todoName },
      });

      if (!todo) {
        throw new Error('할 일을 찾을 수 없습니다');
      }

      todo.isClear += 1;
      if (todo.isClear > todo.number) {
        todo.isClear = 0;
      }

      await this.todoRepo.save(todo);
    } catch (error) {
      throw new Error('할 일 업데이트 중 오류가 발생했습니다');
    }
  }

  async updateCharacter(characterName, to) {
    try {
      const character = await this.characterRepo.findOne({
        where: { name: characterName },
      });

      if (!character) {
        throw new Error('캐릭터를 찾을 수 없습니다');
      }

      character.name = to;

      await this.characterRepo.save(character);
    } catch (error) {
      throw new Error('캐릭터 업데이트 중 오류가 발생했습니다');
    }
  }

  async updateSection(characterName, sectionName, field, to) {
    try {
      const character = await this.characterRepo.findOne({
        where: { name: characterName },
        relations: ['section'],
      });

      if (!character) {
        throw new Error('캐릭터를 찾을 수 없습니다');
      }

      const section = character.section.find((sec) => sec.name === sectionName);

      if (!section) {
        throw new Error('섹션을 찾을 수 없습니다');
      }

      section[field] = to;

      await this.sectionRepo.save(section);
    } catch (error) {
      throw new Error('섹션 업데이트 중 오류가 발생했습니다');
    }
  }

  async updateTodo(characterName, sectionName, todoName, field, to) {
    try {
      const character = await this.characterRepo.findOne({
        where: { name: characterName },
        relations: ['section'],
      });

      if (!character) {
        throw new Error('캐릭터를 찾을 수 없습니다');
      }

      const section = character.section.find((sec) => sec.name === sectionName);

      if (!section) {
        throw new Error('섹션을 찾을 수 없습니다');
      }

      const todo = await this.todoRepo.findOne({
        where: { section, name: todoName },
      });

      if (!todo) {
        throw new Error('할 일을 찾을 수 없습니다');
      }

      todo[field] = to;

      await this.todoRepo.save(todo);
    } catch (error) {
      throw new Error('할 일 업데이트 중 오류가 발생했습니다');
    }
  }

  async deleteSection(characterName, sectionName) {
    try {
      const character = await this.characterRepo.findOne({
        where: { name: characterName },
        relations: ['section'],
      });

      if (!character) {
        throw new Error('캐릭터를 찾을 수 없습니다');
      }

      const section = character.section.find((sec) => sec.name === sectionName);

      if (!section) {
        throw new Error('섹션을 찾을 수 없습니다');
      }

      const sectionWithTodos = await this.sectionRepo.findOne({
        where: { id: section.id },
        relations: ['todo'],
      });

      if (!sectionWithTodos) {
        throw new Error('할 일을 포함한 섹션을 찾을 수 없습니다');
      }

      for (const todo of sectionWithTodos.todo) {
        await this.todoRepo.remove(todo);
      }

      await this.sectionRepo.remove(section);
    } catch (error) {
      throw new Error('섹션 삭제 중 오류가 발생했습니다');
    }
  }

  async deleteTodo(characterName, sectionName, todoName) {
    try {
      const character = await this.characterRepo.findOne({
        where: { name: characterName },
        relations: ['section'],
      });

      if (!character) {
        throw new Error('캐릭터를 찾을 수 없습니다');
      }

      const section = character.section.find((sec) => sec.name === sectionName);

      if (!section) {
        throw new Error('섹션을 찾을 수 없습니다');
      }

      const todo = await this.todoRepo.findOne({
        where: { section, name: todoName },
      });

      if (!todo) {
        throw new Error('할 일을 찾을 수 없습니다');
      }

      await this.todoRepo.remove(todo);
    } catch (error) {
      throw new Error('할 일 삭제 중 오류가 발생했습니다');
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async resetDailyTodo() {
    try {
      const dailySections = await this.sectionRepo.find({
        where: { reset: 'daily' },
        relations: ['todo'],
      });

      for (const section of dailySections) {
        for (const todo of section.todo) {
          todo.isClear = 0;
          await this.todoRepo.save(todo);
        }
      }
    } catch (error) {
      throw new Error('일일 할 일 초기화 중 오류가 발생했습니다');
    }
  }

  @Cron('0 0 * *  SUN', { timeZone: 'Asia/Seoul' })
  async resetMondayTodo() {
    try {
      const mondaySections = await this.sectionRepo.find({
        where: { reset: 'weekly', whenReset: 'monday' },
        relations: ['todo'],
      });

      for (const section of mondaySections) {
        for (const todo of section.todo) {
          todo.isClear = 0;
          await this.todoRepo.save(todo);
        }
      }
    } catch (error) {
      throw new Error('월요일 할 일 초기화 중 오류가 발생했습니다');
    }
  }

  @Cron('0 0 * * WED', { timeZone: 'Asia/Seoul' })
  async resetThursdayTodo() {
    try {
      const thursdaySections = await this.sectionRepo.find({
        where: { reset: 'weekly', whenReset: 'thursday' },
        relations: ['todo'],
      });

      for (const section of thursdaySections) {
        for (const todo of section.todo) {
          todo.isClear = 0;
          await this.todoRepo.save(todo);
        }
      }
    } catch (error) {
      throw new Error('목요일 할 일 초기화 중 오류가 발생했습니다');
    }
  }
}

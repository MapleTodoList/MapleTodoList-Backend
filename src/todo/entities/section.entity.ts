import { Column, Entity, PrimaryColumn, OneToMany, ManyToOne } from 'typeorm';
import { Character } from './character.entity';
import { Todo } from './todo.entity';
import { Reset } from '../types/todo.type';

@Entity()
export class Section {
  @PrimaryColumn()
  id: number;

  @ManyToOne((type) => Character, (character) => character.section)
  character: Character;

  @OneToMany((type) => Todo, (todo) => todo.section)
  todo: Todo[];

  @Column('varchar', { length: 20 })
  name: string;

  @Column('int')
  reset: Reset;
}

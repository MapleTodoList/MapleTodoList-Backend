import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Character } from './character.entity';
import { Todo } from './todo.entity';

@Entity()
export class Section {
  @PrimaryGeneratedColumn()
  id: number;

  @JoinColumn()
  @ManyToOne(() => Character, (character) => character.section)
  character: Character;

  @OneToMany(() => Todo, (todo) => todo.section)
  todo: Todo[];

  @Column('varchar', { length: 20 })
  name: string;

  @Column('varchar')
  reset: string;

  @Column('varchar')
  whenReset: string;
}

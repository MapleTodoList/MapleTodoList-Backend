import { Column, Entity, PrimaryColumn, ManyToOne } from 'typeorm';
import { Section } from './section.entity';
import { howNumber } from '../types/todo.type';

@Entity()
export class Todo {
  @PrimaryColumn()
  id: number;

  @ManyToOne((type) => Section, (section) => section.todo)
  section: Section;

  @Column('varchar', { length: 14 })
  name: string;

  @Column('int')
  number: howNumber;
}

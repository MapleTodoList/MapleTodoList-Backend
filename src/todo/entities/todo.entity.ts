import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Section } from './section.entity';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Section, (section) => section.todo)
  section: Section;

  @Column('varchar', { length: 14 })
  name: string;

  @Column('int')
  number: number;

  @Column('int')
  isClear: number;
}

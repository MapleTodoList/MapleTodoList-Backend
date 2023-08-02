import { Column, Entity, PrimaryColumn, OneToMany } from 'typeorm';
import { Section } from './section.entity';

@Entity()
export class Character {
  @PrimaryColumn()
  id: number;

  @OneToMany((type) => Section, (section) => section.character)
  section: Section[];

  @Column()
  name: string;
}

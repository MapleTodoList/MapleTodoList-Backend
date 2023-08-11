import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Section } from './section.entity';
import { User } from 'src/auth/user.entity';

@Entity()
export class Character {
  @PrimaryGeneratedColumn()
  id: number;

  @JoinColumn()
  @ManyToOne(() => User, (User) => User.character)
  user: User;

  @OneToMany(() => Section, (section) => section.character)
  section: Section[];

  @Column('varchar')
  name: string;
}

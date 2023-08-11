import { Column, Entity, PrimaryColumn, OneToMany } from 'typeorm';
import { Character } from 'src/todo/entities/character.entity';

@Entity()
export class User {
  @PrimaryColumn('varchar', { length: 255 })
  id!: string;

  @Column('varchar', { length: 10 })
  username!: string;

  @Column('varchar', { length: 100 })
  email!: string;

  @Column('text')
  password!: string;

  @Column('text')
  accessToken!: string;

  @OneToMany(() => Character, (character) => character.user)
  character: Character[];
}

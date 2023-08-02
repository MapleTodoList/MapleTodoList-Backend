import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn('varchar', { length: 255 })
  id!: string;

  @Column('varchar', { length: 10, unique: true })
  username!: string;

  @Column('varchar', { length: 100, unique: true })
  email!: string;

  @Column('text')
  password!: string;

  @Column('text')
  accessToken!: string;

  @Column('varchar')
  character!: string;
}

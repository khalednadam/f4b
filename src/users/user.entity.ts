import { ACCOUNT_TYPE, ROLES } from '../constants/api.enums';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  avatarUrl: string;

  @Column({ type: 'enum', enum: ACCOUNT_TYPE })
  type: string;

  @Column({ type: 'enum', enum: ROLES })
  role: string;

  @Column()
  password: string;

  // constructor(user: Partial<User>) {
  //   Object.assign(user);
  // }
}

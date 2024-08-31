import { Exclude } from 'class-transformer';
import { ROLES } from '../constants/api.enums';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Project } from '../projects/project.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column({ nullable: true, default: null })
  avatarUrl: string | null;

  @Column({ type: 'enum', enum: ROLES })
  role: string;

  @OneToMany(() => Project, (project) => project.user)
  projects: Project[];

  @Exclude()
  @Column()
  password: string;
}

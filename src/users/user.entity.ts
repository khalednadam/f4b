import { Exclude } from 'class-transformer';
import { ROLES } from '../constants/api.enums';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
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

  @OneToMany(() => Project, (project) => project.owner)
  projects: Project[];

  @ManyToMany(() => Project, (project) => project.integrators)
  integratedProjects: Project[];

  @ManyToMany(() => Project, (project) => project.savedBy)
  @JoinTable({
    name: 'user_saved_projects',
  })
  savedProjects: Project[];

  @Exclude()
  @Column()
  password: string;
}

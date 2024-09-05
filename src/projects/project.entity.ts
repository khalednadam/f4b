import { IsUrl } from 'class-validator';
import { PROJECT_TYPE } from 'src/constants/api.enums';
import { User } from '../users/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'enum', enum: PROJECT_TYPE })
  type: string;

  @Column()
  @IsUrl()
  repositoryLink: string;

  @ManyToOne(() => User, (user) => user.projects)
  owner: User;

  @ManyToMany(() => User, (user) => user.integratedProjects)
  @JoinTable({
    name: 'project_integrators',
  })
  integrators: User[];

  @ManyToMany(() => User, (user) => user.savedProjects)
  savedBy: User[];
}

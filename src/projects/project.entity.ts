import { IsUrl } from 'class-validator';
import { PROJECT_TYPE } from 'src/constants/api.enums';
import { User } from '../users/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  // TODO: Add users who worked on it (or something similar)
  @ManyToOne(() => User, (user) => user.projects)
  user: User;
}

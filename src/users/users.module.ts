import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { RolesGuard } from '../guards/roles.guard';
import { Project } from '../projects/project.entity';
import { ProjectsModule } from 'src/projects/projects.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Project])],
  providers: [UsersService, RolesGuard],
  controllers: [UsersController],
})
export class UsersModule {}

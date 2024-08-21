import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { RolesGuard } from './guards/roles.guard';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, RolesGuard],
  controllers: [UsersController],
})
export class UsersModule {}

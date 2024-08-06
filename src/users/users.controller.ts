import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('user/:id')
  async getUserById(@Param('id') id: number) {
    const user = await this.usersService.getUserById(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  @Get()
  getAllUsers(
    @Param('page') page: number = 1,
    @Param('limit') limit: number = 20,
  ) {
    return this.usersService.paginate({ page, limit });
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    const deleteUser = await this.usersService.deleteUser(id);
    if (deleteUser.affected === 0) {
      throw new NotFoundException('user not found');
    }
    return deleteUser;
  }

  @Put('user/:id')
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(id, updateUserDto);
  }
}

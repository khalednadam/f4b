import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Create a new user
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    const rounds = parseInt(this.configService.get<string>('ROUNDS'));
    const hashedPassword = await bcrypt.hash(createUserDto.password, rounds);
    createUserDto.password = hashedPassword;
    Object.assign(user, createUserDto);
    return this.userRepository.save(user);
  }

  /**
   * Get a user by id
   */
  async getUserById(id: number) {
    return this.userRepository.findOne({
      where: { id },
    });
  }

  /**
   * Get all users with pagination
   */
  async paginate(options: IPaginationOptions): Promise<Pagination<User>> {
    return paginate<User>(this.userRepository, options);
  }
}

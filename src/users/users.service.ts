import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { UpdateUserDto } from './dto/update-user.dto';
import { Project } from '../projects/project.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
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
      relations: {
        projects: true,
      },
    });
  }

  /**
   * Get user by username
   */
  async getUserByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new NotFoundException('User is not found');
    }
    return user;
  }

  /**
   * Get a user by emaiil
   */
  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('User is not found');
    }
    return user;
  }

  /**
   * Paginate all users
   */
  async paginate(options: IPaginationOptions): Promise<Pagination<User>> {
    return paginate<User>(this.userRepository, options);
  }

  /**
   * Delete a user by id
   */
  async deleteUser(id: number): Promise<DeleteResult> {
    return this.userRepository.delete({ id });
  }

  /**
   * Update a user by id
   */
  async updateUser(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    return this.userRepository.update({ id: id }, updateUserDto);
  }

  /**
   * save a project
   * @param {number} projectId project id
   * @param {number} userId user id
   */
  async saveProject(projectId: number, userId: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['savedProjects'],
    });
    const project = await this.projectRepository.findOneBy({ id: projectId });
    const alreadySaved = user.savedProjects.some(
      (project) => project.id === projectId,
    );

    if (!alreadySaved) {
      user.savedProjects.push(project);
    }

    return this.userRepository.save(user);
  }
}

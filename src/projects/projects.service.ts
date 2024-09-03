import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Project } from './project.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateProjectDto } from './dto/update-project.dto';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  /**
   * Create a new project
   */
  async create(
    createProjectDto: CreateProjectDto,
    ownerId: number,
  ): Promise<Project> {
    const project = new Project();
    Object.assign(project, { ...createProjectDto, owner: ownerId });
    return this.projectRepository.save(project);
  }

  /**
   * Update a project by id
   * @param projectId
   * @param updateProjectDto the project body
   */
  async update(
    projectId: number,
    updateProjectDto: UpdateProjectDto,
  ): Promise<UpdateResult> {
    return this.projectRepository.update({ id: projectId }, updateProjectDto);
  }

  /**
   * paginate the projects of a owner using the owner id
   * @param options pagination options
   * @param ownerId
   */
  async paginateByOwner(
    options: IPaginationOptions,
    ownerId: number,
  ): Promise<Pagination<Project>> {
    return paginate<Project>(this.projectRepository, options, {
      where: {
        owner: {
          id: ownerId,
        },
      },
    });
  }

  /**
   * paginate all the projects
   * @param options pagination options
   */
  // TODO: add more query filters for pagination to be applied on projects
  async getAll(options: IPaginationOptions): Promise<Pagination<Project>> {
    return paginate<Project>(this.projectRepository, options, {
      relations: {
        owner: true,
      },
    });
  }

  /**
   * delete a project by id
   * @param id project id
   */
  async delete(id: number): Promise<DeleteResult> {
    return this.projectRepository.delete({ id });
  }

  /**
   * get a project by id
   * @param id project id
   */
  async getOne(id: number): Promise<Project> {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: {
        owner: true,
      },
    });
    if (!project) {
      throw new UnauthorizedException('Project is not found');
    }
    return project;
  }
}

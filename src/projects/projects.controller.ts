import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './project.entity';
import { ProjectsService } from './projects.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateProjectDto } from './dto/update-project.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { PaginateProjectsDto } from './dto/paginate-projects.dto';
import { ROLES } from 'src/constants/api.enums';
import { Pagination } from 'nestjs-typeorm-paginate';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createProjectDto: CreateProjectDto,
    @Request() req,
  ): Promise<Project> {
    return this.projectsService.create(createProjectDto, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('project/:id')
  async getOne(@Param('id') id: number): Promise<Project> {
    return this.projectsService.getOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('project/:id')
  async update(
    @Request() req,
    @Param('id') id: number,
    @Body() updateProjectDto: UpdateProjectDto,
  ): Promise<UpdateResult> {
    const project = await this.projectsService.getOne(id);
    if (project.owner.id !== req.user.id) {
      throw new UnauthorizedException(
        'You are not authorized to update this project',
      );
    }
    return this.projectsService.update(id, updateProjectDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('of/:ownerId')
  async paginateProjectsOfOwner(
    @Param('ownerId') ownerId: number,
    @Query() query: PaginateProjectsDto,
  ): Promise<Pagination<Project>> {
    return this.projectsService.paginateByOwner(
      { limit: query.limit, page: query.page },
      ownerId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  async paginateProjects(
    @Query() query: PaginateProjectsDto,
  ): Promise<Pagination<Project>> {
    return this.projectsService.getAll({
      limit: query.limit,
      page: query.page,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete('project/:id')
  async delete(@Request() req, @Param('id') id: number): Promise<DeleteResult> {
    const project = await this.projectsService.getOne(id);
    if (project.owner.id !== req.user.id && req.user.role !== ROLES.ADMIN) {
      throw new UnauthorizedException(
        'You are not authorized to delete this project',
      );
    }
    return this.projectsService.delete(id);
  }
}

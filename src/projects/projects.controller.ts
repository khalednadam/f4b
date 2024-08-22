import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './project.entity';
import { ProjectsService } from './projects.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createProjectDto: CreateProjectDto,
    @Request() req,
  ): Promise<any> {
    return this.projectsService.create(createProjectDto, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('project/:id')
  async getOne(@Param('id') id: number): Promise<Project> {
    return this.projectsService.getOne(id);
  }

  // @Get()
  // async getAll() {
  //   return await this.projectsService.getAll();
  // }
}

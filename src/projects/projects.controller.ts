import { UpdateProjectDto } from './dto/updateProject.dto';
import { ProjectsService } from './projects.service';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Project } from './models/projects.model';
import { ProjectDto } from './dto/project.dto';
import * as mongoose from 'mongoose';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  public async findOne(@Param('id') id: string): Promise<Project> {
    return this.projectsService.findOne(id);
  }

  @Post('create')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.CREATED)
  public async create(
    @Body() projectDto: ProjectDto,
    @Req() req: any,
  ): Promise<Project> {
    console.log();
    return this.projectsService.create(projectDto, req.user._id);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  public async findAll(): Promise<Project[]> {
    return this.projectsService.findAll();
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  public async update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    const project = await this.projectsService.update(id, updateProjectDto);

    return project;
  }
}

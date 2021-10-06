import { FileInterceptor } from '@nestjs/platform-express';
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
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Project } from './models/projects.model';
import { ProjectDto } from './dto/project.dto';
import * as mongoose from 'mongoose';
import { diskStorage } from 'multer';
import { HelpersFile } from 'src/shared/helpersFile';

@Controller('projects-public')
export class ProjectsPublicController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async findAllPublic(): Promise<Project[]> {
    return this.projectsService.findAllPublic();
  }

  @Get(':slug')
  @HttpCode(HttpStatus.OK)
  public async findOneBySlug(@Param('slug') slug: string): Promise<Project> {
    return this.projectsService.findOneBySlug(slug);
  }
}

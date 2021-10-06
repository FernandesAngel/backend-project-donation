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

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
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
    return this.projectsService.create(projectDto, req.user._id);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
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

  @Patch('status/:id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  public async updateStatus(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    const project = await this.projectsService.updateStatus(
      id,
      updateProjectDto,
    );

    return project;
  }

  @Patch('image/:id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './upload/project',
        filename: HelpersFile.customFileName,
      }),
    }),
  )
  updateAvatar(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Project> {
    return this.projectsService.updateImage(file.path, id);
  }

  @Get('project/:imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './upload/project' });
  }
}

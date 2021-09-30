import { UpdateProjectDto } from './dto/updateProject.dto';
import { ProjectDto } from './dto/project.dto';
import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from './models/projects.model';
import * as mongoose from 'mongoose';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel('Project')
    private readonly projectsModel: mongoose.Model<Project>,
  ) {}

  public async create(
    projectDto: ProjectDto,
    user: mongoose.Schema.Types.ObjectId,
  ): Promise<Project> {
    const project = new this.projectsModel({
      ...projectDto,
      user,
    });

    return (await project.save()).populate('user');
  }
  public async findAll(): Promise<Project[]> {
    return this.projectsModel.find().populate('user');
  }

  public async findOne(id: string): Promise<Project> {
    const project = this.projectsModel.findById(id);
    if (!project) {
      throw new HttpException(`Projeto não encontrado`, HttpStatus.NOT_FOUND);
    }
    return project;
  }

  public async update(
    id: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    return this.projectsModel.findByIdAndUpdate(id, updateProjectDto, {
      new: true,
    });
  }
}

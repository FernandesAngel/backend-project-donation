import { UpdateProjectDto } from './dto/updateProject.dto';
import { ProjectDto } from './dto/project.dto';
import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from './models/projects.model';
import * as mongoose from 'mongoose';
import { HelpersFile } from 'src/shared/helpersFile';

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
  public async findAllPublic(): Promise<Project[]> {
    return this.projectsModel.find({ status: true }).populate('user');
  }

  public async findOne(id: string): Promise<Project> {
    const project = this.projectsModel.findById(id);
    if (!project) {
      throw new HttpException(`Projeto não encontrado`, HttpStatus.NOT_FOUND);
    }
    return project;
  }
  public async findOneBySlug(slug: string): Promise<Project> {
    const project = await this.projectsModel.findOne({ slug, status: true });
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
  public async updateStatus(
    id: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    return this.projectsModel.findByIdAndUpdate(id, updateProjectDto, {
      new: true,
    });
  }

  public async updateImage(file: string, id: string) {
    const projectImage = await this.projectsModel.findById(id);
    if (projectImage.image) {
      await HelpersFile.removeFile(projectImage.image);
    }
    return this.projectsModel.findByIdAndUpdate(
      id,
      { image: file },
      { new: true },
    );
  }
}

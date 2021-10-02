import { IsNotEmpty, IsString } from 'class-validator';

export class ProjectDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  image: string;

  status: boolean;
  createdAt: Date;
}

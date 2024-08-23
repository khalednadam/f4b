import { IsEnum, IsOptional, IsString, IsUrl } from 'class-validator';
import { PROJECT_TYPE } from 'src/constants/api.enums';

export class UpdateProjectDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsEnum(PROJECT_TYPE)
  @IsOptional()
  type: string;

  @IsUrl()
  @IsOptional()
  repositoryLink: string;
}

import { IsEnum, IsInt, IsString, IsUrl } from 'class-validator';
import { PROJECT_TYPE } from 'src/constants/api.enums';

export class CreateProjectDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsUrl()
  repositoryLink: string;

  @IsEnum(PROJECT_TYPE)
  type: string;
}

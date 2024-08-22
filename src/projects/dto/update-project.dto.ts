import { IsEnum, IsString, IsUrl } from 'class-validator';
import { PROJECT_TYPE } from 'src/constants/api.enums';

export class UpdateProjectDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsEnum(PROJECT_TYPE)
  type: string;

  @IsUrl()
  repositoryLink: string;
}

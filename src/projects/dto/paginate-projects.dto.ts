import { IsOptional, IsString } from 'class-validator';

export class PaginateProjectsDto {
  @IsString()
  @IsOptional()
  limit: string = '20';

  @IsString()
  page: string = '1';
}

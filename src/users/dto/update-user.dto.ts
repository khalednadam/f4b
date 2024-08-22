import { IsString, IsEmail, IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';
import { ROLES } from '../../constants/api.enums';

export class UpdateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  username: string;

  @IsString()
  avatarUrl: string;

  @IsEnum(ROLES)
  @Transform(({ value }) => value ?? ROLES.USER)
  role: string = ROLES.USER;
}

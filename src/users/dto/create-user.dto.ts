import { IsEmail, IsEnum, IsString } from 'class-validator';
import { ACCOUNT_TYPE, ROLES } from '../../constants/api.enums';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  // name: string;
  @IsEmail()
  email: string;

  @IsString()
  username: string;

  @IsString()
  avatarUrl: string;

  @Transform(({ value }) => value ?? ROLES.USER)
  @IsEnum(ROLES)
  role: string = ROLES.USER;

  @IsString()
  password: string;
}

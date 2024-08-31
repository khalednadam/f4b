import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { ROLES } from '../../constants/api.enums';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @Matches('^[a-zA-Z0-9](?!.*[._]{2})[a-zA-Z0-9._]{0,28}[a-zA-Z0-9]$')
  username: string;

  @IsString()
  @IsOptional()
  avatarUrl: string | null;

  @Transform(({ value }) => value ?? ROLES.USER)
  @IsEnum(ROLES)
  role: string = ROLES.USER;

  @IsString()
  @Matches('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?!.* ).{8,}$')
  password: string;
}

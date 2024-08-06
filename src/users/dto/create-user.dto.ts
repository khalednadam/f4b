import { IsEnum } from 'class-validator';
import { ACCOUNT_TYPE, ROLES } from '../../constants/api.enums';

export class CreateUserDto {
  name: string;
  email: string;
  username: string;
  avatarUrl: string;

  @IsEnum(ACCOUNT_TYPE)
  type: string;

  @IsEnum(ROLES)
  role: string;

  password: string;
}

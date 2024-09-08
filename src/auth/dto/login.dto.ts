import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  username: string;

  @IsNumber()
  id: number;

  @IsString()
  role: string;

  @IsString()
  @IsOptional()
  avatarUrl?: string;
}

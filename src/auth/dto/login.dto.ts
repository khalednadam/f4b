import { IsEmail, IsNumber, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsNumber()
  id: number;

  @IsString()
  role: string;
}

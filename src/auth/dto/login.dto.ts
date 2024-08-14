import { IsEmail, IsNumber } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsNumber()
  id: number;
}

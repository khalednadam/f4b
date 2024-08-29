import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

const EXPIRE_TIME = 1000 * 60 * 30;

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  /**
   * validate who is the user by the username and password
   */
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.getUserByEmail(username);
    const isMatch = await bcrypt.compare(password, user.password);
    if (user && isMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  /**
   * Login
   */
  async login(user: LoginDto) {
    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
      username: user.username,
    };
    return {
      email: user.email,
      id: user.id,
      role: user.role,
      username: user.username,
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, {
        expiresIn: this.configService.getOrThrow('JWT_REFRESH_EXPIRATION'),
      }),
      expiration_time: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
    };
  }

  /**
   * set a new access token using the refresh token
   */
  async refreshToken(user: LoginDto) {
    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
      username: user.username,
    };
    return {
      access_token: this.jwtService.sign(payload),
      expiration_time: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
    };
  }
}

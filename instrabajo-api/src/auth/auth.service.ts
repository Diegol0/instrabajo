import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../users/.dto/login-user.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginUserDto: LoginUserDto) {
    const user = await this.usersService.findOneByUserName(
      loginUserDto.username,
    );

    if (user) {
      const isMatch = await bcrypt.compare(
        loginUserDto.password,
        user.password,
      );
      if (isMatch) {
        user.password = null;
        const payload = { username: loginUserDto.username };
        return {
          access_token: this.jwtService.sign(payload),
          user: user,
        };
      }
    }
    throw new UnauthorizedException();
  }
}

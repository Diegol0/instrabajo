import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './.dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    if (await this.usersService.isUserUnique(createUserDto)) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
      createUserDto.password = hashedPassword;
      if (!createUserDto.username) createUserDto.username = createUserDto.email;
      return this.usersService.create(createUserDto);
    } else {
      throw new HttpException(
        'The username or email is not available',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}

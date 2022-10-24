import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Put,
  UseGuards,
  Get,
  Param,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './.dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateUserDto } from './.dto/update-user.dto';
import { User } from 'src/schemas/users.schema';

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
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async findOneAndUpdateUser(
    @Body() updateUserDTO: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.findOneAndUpdate(updateUserDTO);
  }
}

import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { EmployerService } from './employer.service';
import { CreateEmployerDto } from './.dto/create-employer.dto';
import { UpdateEmployerDto } from './.dto/update-employer.dto';
import { Employer } from './schemas/employer.schema';
import * as bcrypt from 'bcrypt';
// import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('employers')
export class EmployerController {
  constructor(private readonly employersService: EmployerService) {}

  @Post()
  async create(@Body() createEmployerDto: CreateEmployerDto) {
    if (await this.employersService.isEmployerUnique(createEmployerDto)) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(
        createEmployerDto.password,
        salt,
      );
      createEmployerDto.password = hashedPassword;
      if (!createEmployerDto.username)
        createEmployerDto.username = createEmployerDto.email;
      return this.employersService.create(createEmployerDto);
    } else {
      throw new HttpException(
        'The username or email is not available',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // @UseGuards(JwtAuthGuard)
  // @Put()
  // async findOneAndUpdateBreed(
  //   @Body() updateEmployerBreedDTO: UpdateEmployerBreedDto,
  // ): Promise<Employer> {
  //   return this.employersService.findOneAndUpdateBreed(updateEmployerBreedDTO);
  // }
}

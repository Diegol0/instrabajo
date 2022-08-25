import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './.dto/create-employee.dto';
import { Employee } from './schemas/employee.schema';
import * as bcrypt from 'bcrypt';
// import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeesService: EmployeeService) {}

  @Post()
  async create(@Body() createEmployeeDto: CreateEmployeeDto) {
    if (await this.employeesService.isEmployeeUnique(createEmployeeDto)) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(
        createEmployeeDto.password,
        salt,
      );
      createEmployeeDto.password = hashedPassword;
      if (!createEmployeeDto.username)
        createEmployeeDto.username = createEmployeeDto.email;
      return this.employeesService.create(createEmployeeDto);
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
  //   @Body() updateEmployeeBreedDTO: UpdateEmployeeBreedDto,
  // ): Promise<Employee> {
  //   return this.employeesService.findOneAndUpdateBreed(updateEmployeeBreedDTO);
  // }
}

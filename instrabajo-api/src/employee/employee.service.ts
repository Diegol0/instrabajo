import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEmployeeDto } from './.dto/create-employee.dto';
import { UpdateEmployeeDto } from './.dto/update-employee.dto';
import { Employee, EmployeeDocument } from './schemas/employee.schema';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name)
    private readonly employeeModel: Model<EmployeeDocument>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const createdEmployee = await this.employeeModel.create(createEmployeeDto);
    createdEmployee.password = null;
    return createdEmployee;
  }

  async findOneAndUpdateBreed(
    updateEmployeeDTO: UpdateEmployeeDto,
  ): Promise<EmployeeDocument> {
    const updatedEmployee = await this.employeeModel
      .findOneAndUpdate(
        { _id: updateEmployeeDTO._id },
        { favoriteBreed: updateEmployeeDTO.name },
        { new: true },
      )
      .exec();
    updatedEmployee.password = null;
    return updatedEmployee;
  }

  async findOneByEmployeeName(username: string): Promise<Employee> {
    return this.employeeModel.findOne({ username: username }).exec();
  }

  async isEmployeeUnique(
    createEmployeeDto: CreateEmployeeDto,
  ): Promise<boolean> {
    const existEmployee = await this.employeeModel
      .exists({
        $or: [
          { username: createEmployeeDto.username },
          { email: createEmployeeDto.email },
        ],
      })
      .exec();
    console.log(existEmployee);
    return existEmployee?._id == null;
  }

  async delete(id: string) {
    const deletedEmployee = await this.employeeModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedEmployee;
  }
}

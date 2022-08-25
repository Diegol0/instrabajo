import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEmployerDto } from './.dto/create-employer.dto';
import { UpdateEmployerDto } from './.dto/update-employer.dto';
import { Employer, EmployerDocument } from './schemas/employer.schema';

@Injectable()
export class EmployerService {
  constructor(
    @InjectModel(Employer.name)
    private readonly employerModel: Model<EmployerDocument>,
  ) {}

  async create(createEmployerDto: CreateEmployerDto): Promise<Employer> {
    const createdEmployer = await this.employerModel.create(createEmployerDto);
    createdEmployer.password = null;
    return createdEmployer;
  }

  async findOneAndUpdateBreed(
    updateEmployerDTO: UpdateEmployerDto,
  ): Promise<EmployerDocument> {
    const updatedEmployer = await this.employerModel
      .findOneAndUpdate(
        { _id: updateEmployerDTO._id },
        { favoriteBreed: updateEmployerDTO.name },
        { new: true },
      )
      .exec();
    updatedEmployer.password = null;
    return updatedEmployer;
  }

  async findOneByEmployerName(username: string): Promise<Employer> {
    return this.employerModel.findOne({ username: username }).exec();
  }

  async isEmployerUnique(
    createEmployerDto: CreateEmployerDto,
  ): Promise<boolean> {
    const existEmployer = await this.employerModel
      .exists({
        $or: [
          { username: createEmployerDto.username },
          { email: createEmployerDto.email },
        ],
      })
      .exec();
    console.log(existEmployer);
    return existEmployer?._id == null;
  }

  async delete(id: string) {
    const deletedEmployer = await this.employerModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedEmployer;
  }
}

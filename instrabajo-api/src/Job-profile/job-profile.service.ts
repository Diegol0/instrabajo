import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JobProfile, JobProfileDocument } from 'src/schemas/job-profile.schema';
import { CreateJobProfileDto } from './dto/create-job-profile.dto';

@Injectable()
export class JobProfileService {
  constructor(
    @InjectModel(JobProfile.name) private readonly jobModel: Model<JobProfileDocument>,
  ) {}

  async create(createJobDto: CreateJobProfileDto) {
    const createdJob = await this.jobModel.create(createJobDto);
    return createdJob;
  }

  async findAll() {
    return await this.jobModel.find().exec();
  }

  async findOne(id: string) {
    return await this.jobModel.findById(id).exec();
  }

  async findByEmployer(employer: string) {
    return await this.jobModel.find({ employer: employer }).exec();
  }

  async findByEmployee(employee: string) {
    return await this.jobModel.find({ employee: employee }).exec();
  }

  async findByStatus(status: string) {
    return await this.jobModel.find({ status: status }).exec();
  }

  async update(_id: number, updateJobDto: CreateJobProfileDto) {
    const params = {
      name: updateJobDto.name,
      description: updateJobDto.description,
      skill: updateJobDto.skill,
      rateType: updateJobDto.rateType,
      hourlyRate: updateJobDto.hourlyRate,
      fixedRate: updateJobDto.fixedRate,
      status: updateJobDto.status,
      images: updateJobDto.images,
      address: updateJobDto.address,
      employee: updateJobDto.employee,
      employer: updateJobDto.employer,
      employeeVerified: updateJobDto.employeeVerified,
    };

    for (const prop in params) if (!params[prop]) delete params[prop];
    const updatedJob = await this.jobModel
      .findOneAndUpdate({ _id: updateJobDto._id }, params)
      .exec();
    return updatedJob;
  }

  async remove(id: string) {
    const deletedJob = await this.jobModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedJob;
  }
}

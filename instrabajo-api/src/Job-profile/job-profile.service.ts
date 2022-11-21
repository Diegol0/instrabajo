import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JobProfile, JobProfileDocument } from 'src/schemas/job-profile.schema';
import { CreateJobProfileDto } from './dto/create-job-profile.dto';

@Injectable()
export class JobProfileService {
  constructor(
    @InjectModel(JobProfile.name) private readonly JobProfile: Model<JobProfileDocument>,
  ) {}

  async create(createJobDto: CreateJobProfileDto) {
    const createdJob = await this.JobProfile.create(createJobDto);
    return createdJob;
  }

  async findAll() {
    return await this.JobProfile.find().exec();
  }

  async findOne(id: string) {
    return await this.JobProfile.findById(id).exec();
  }

  async findByEmployer(employer: string) {
    return await this.JobProfile.find({ employer: employer }).exec();
  }

  async findByEmployee(employee: string) {
    return await this.JobProfile.find({ employee: employee }).exec();
  }

  async findByStatus(status: string) {
    return await this.JobProfile.find({ status: status }).exec();
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
    const updatedJob = await this.JobProfile
      .findOneAndUpdate({ _id: updateJobDto._id }, params)
      .exec();
    return updatedJob;
  }

  async remove(id: string) {
    const deletedJob = await this.JobProfile
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedJob;
  }
}

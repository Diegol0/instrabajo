import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JobUser, JobUserDocument } from 'src/schemas/job-user.schema';
import { Job, JobDocument } from 'src/schemas/jobs.schema';
import { CreateJobUserDto } from './dto/create-job-user.dto';
import { CreateJobDto } from './dto/create-job.dto';

@Injectable()
export class JobsService {
  constructor(
    @InjectModel(Job.name) private readonly jobModel: Model<JobDocument>,
    @InjectModel(JobUser.name)
    private readonly jobUserModel: Model<JobUserDocument>,
  ) {}

  async create(createJobDto: CreateJobDto) {
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

  async update(_id: number, updateJobDto: CreateJobDto) {
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

  async createJobUser(createJobUserDto: CreateJobUserDto) {
    const createdJob = await this.jobUserModel.create(createJobUserDto);
    return createdJob;
  }

  async findJobAppliedByEmployee(userId: string) {
    return await this.jobUserModel.find({ userId: userId }).exec();
  }

  async findJobAppliedByJob(jobId: string) {
    return await this.jobUserModel.find({ jobId: jobId }).exec();
  }

  async remove(id: string) {
    const deletedJob = await this.jobModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedJob;
  }
}

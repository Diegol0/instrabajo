import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Job, JobDocument } from 'src/schemas/jobs.schema';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@Injectable()
export class JobsService {
  constructor(
    @InjectModel(Job.name) private readonly jobModel: Model<JobDocument>,
  ) {}

  async create(createJobDto: CreateJobDto) {
    const createdJob = await this.jobModel.create(createJobDto);
    return createdJob;
  }

  async findAll() {
    return await this.jobModel.find().exec();
  }

  async findOne(id: number) {
    return await this.jobModel.findById(id).exec();
  }

  async findByEmployer(employerId: number) {
    return await this.jobModel.find({ employerId: employerId }).exec();
  }

  update(id: number, updateJobDto: UpdateJobDto) {
    return `This action updates a #${id} job`;
  }

  remove(id: number) {
    return `This action removes a #${id} job`;
  }
}

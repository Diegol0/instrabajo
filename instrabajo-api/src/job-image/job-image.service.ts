import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JobImage, JobImageDocument } from 'src/schemas/job-images.schema';
import { JobImageDto } from './dto/job-image.dto';

@Injectable()
export class JobImagesService {
  constructor(
    @InjectModel(JobImage.name)
    private readonly jobImageModel: Model<JobImageDocument>,
  ) {}

  async create(createJobImageDto: JobImageDto) {
    const createdJobImage = await this.jobImageModel.create(createJobImageDto);
    return createdJobImage;
  }

  async findAll() {
    return await this.jobImageModel.find().exec();
  }

  async findOne(id: string) {
    return await this.jobImageModel.findById(id).exec();
  }

  async findByJob(jobId: string) {
    return await this.jobImageModel.find({ jobId: jobId }).exec();
  }

  async remove(id: string) {
    const deletedJobImage = await this.jobImageModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedJobImage;
  }
}

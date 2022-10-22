import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { JobImageDto } from './dto/job-image.dto';
import { JobImagesService } from './job-image.service';

@Controller('job-images')
export class JobImageController {
  constructor(private readonly jobsImageService: JobImagesService) {}

  @Post()
  create(@Body() jobImageDto: JobImageDto) {
    return this.jobsImageService.create(jobImageDto);
  }

  @Get()
  findAll() {
    return this.jobsImageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobsImageService.findOne(id);
  }

  @Get('job/:jobId')
  findByJob(@Param('jobId') id: string) {
    return this.jobsImageService.findByJob(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobsImageService.remove(id);
  }
}

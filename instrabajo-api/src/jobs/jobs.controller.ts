import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  create(@Body() createJobDto: CreateJobDto) {
    return this.jobsService.create(createJobDto);
  }

  @Get()
  findAll() {
    return this.jobsService.findAll();
  }

  @Get('job/:id')
  findOne(@Param('id') id: string) {
    return this.jobsService.findOne(id);
  }

  @Get('employer/:userId')
  findByEmployer(@Param('userId') id: string) {
    return this.jobsService.findByEmployer(id);
  }

  @Get('employee/:userId')
  findByEmployee(@Param('userId') id: string) {
    return this.jobsService.findByEmployee(id);
  }

  @Get('status/:status')
  findByStatus(@Param('status') status: string) {
    return this.jobsService.findByStatus(status);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobDto: CreateJobDto) {
    return this.jobsService.update(+id, updateJobDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobsService.remove(id);
  }
}

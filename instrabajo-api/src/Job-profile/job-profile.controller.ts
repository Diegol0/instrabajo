import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { JobProfileService } from './job-profile.service';
import { CreateJobProfileDto } from './dto/create-job-profile.dto';

@Controller('job-profile')
export class JobProfileController {
  constructor(private readonly jobsService: JobProfileService) {}

  @Post()
  create(@Body() createJobDto: CreateJobProfileDto) {
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
  update(@Param('id') id: string, @Body() updateJobDto: CreateJobProfileDto) {
    return this.jobsService.update(+id, updateJobDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobsService.remove(id);
  }
}

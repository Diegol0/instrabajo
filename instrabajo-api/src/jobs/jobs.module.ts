import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Job, JobSchema } from 'src/schemas/jobs.schema';
import { JobUser, JobUserSchema } from 'src/schemas/job-user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Job.name, schema: JobSchema },
      { name: JobUser.name, schema: JobUserSchema },
    ]),
  ],
  controllers: [JobsController],
  providers: [JobsService],
})
export class JobsModule {}

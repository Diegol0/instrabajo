import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JobProfile, JobProfileSchema } from 'src/schemas/job-profile.schema';
import { JobProfileController } from './job-profile.controller';
import { JobProfileService } from './job-profile.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: JobProfile.name, schema: JobProfileSchema },
    ]),
  ],
  controllers: [JobProfileController],
  providers: [JobProfileService],
})
export class JobProfileModule {}

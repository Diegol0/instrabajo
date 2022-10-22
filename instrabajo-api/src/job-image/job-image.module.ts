import { Module } from '@nestjs/common';
import { JobImagesService } from './job-image.service';
import { JobImageController } from './job-image.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { JobImage, JobImageSchema } from 'src/schemas/job-images.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: JobImage.name, schema: JobImageSchema },
    ]),
  ],

  controllers: [JobImageController],
  providers: [JobImagesService],
})
export class JobImageModule {}

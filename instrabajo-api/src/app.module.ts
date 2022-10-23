import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { JobsModule } from './jobs/jobs.module';
import { AddressModule } from './address/address.module';
import { ReviewModule } from './review/review.module';
import { MessageModule } from './message/message.module';
import { FileUploadController } from './users/file-upload.controller';
import { FileService } from './users/file-service';
import { JobImageModule } from './job-image/job-image.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    MongooseModule.forRoot(
      'mongodb+srv://instrabajo:jmRZ9qq2Q019smS2@instrabajo.fxm5kak.mongodb.net/?retryWrites=true&w=majority',
    ),
    JobsModule,
    JobImageModule,
    AddressModule,
    ReviewModule,
    MessageModule
  ],
  controllers: [AppController, FileUploadController],
  providers: [AppService, FileService],
})
export class AppModule {}

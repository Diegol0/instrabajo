import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { Transform } from 'class-transformer';

export type JobUserDocument = JobUser & Document;

@Schema()
export class JobUser {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ required: true })
  jobId: string;

  @Prop({ required: true })
  userId: string;
}

export const JobUserSchema = SchemaFactory.createForClass(JobUser).index(
  {
    jobId: 1,
    userId: 1,
  },
  { unique: true },
);

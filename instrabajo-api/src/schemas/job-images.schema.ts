import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { Transform } from 'class-transformer';

export type JobImageDocument = JobImage & Document;

@Schema()
export class JobImage {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ required: true })
  jobId: string;

  @Prop({ required: true })
  imageKey: string;
}

export const JobImageSchema = SchemaFactory.createForClass(JobImage);

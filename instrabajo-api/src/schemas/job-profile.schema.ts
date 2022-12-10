import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { Transform } from 'class-transformer';

export type JobProfileDocument = JobProfile & Document;

@Schema()
export class JobProfile {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ required: true })
  employee: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  skill: string;

  @Prop()
  images: string[];
}

export const JobProfileSchema = SchemaFactory.createForClass(JobProfile);

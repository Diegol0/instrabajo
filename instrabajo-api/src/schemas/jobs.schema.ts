import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { Transform } from 'class-transformer';

export type JobDocument = Job & Document;

@Schema()
export class Job {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  skill: string;

  @Prop({ required: true })
  rateType: string;

  @Prop()
  hourlyRate: number;

  @Prop()
  fixedRate: number;

  @Prop()
  status: string;

  @Prop()
  images: string[];

  @Prop()
  address: string;

  @Prop()
  employee: string;

  @Prop()
  employer: string;

  @Prop()
  employeeVerified: boolean;
}

export const JobSchema = SchemaFactory.createForClass(Job);

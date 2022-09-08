import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { Address, AddressSchema } from './address.schema';
import { Type, Transform } from 'class-transformer';

export type JobDocument = Job & Document;

@Schema()
export class Job {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  rate: number;

  @Prop()
  image: string;

  @Prop({ required: true })
  employerId: string;

  @Prop({ type: AddressSchema })
  @Type(() => Address)
  address: Address;
}

export const JobSchema = SchemaFactory.createForClass(Job);

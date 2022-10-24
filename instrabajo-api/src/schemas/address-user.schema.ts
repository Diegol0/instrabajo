import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { Document, ObjectId } from 'mongoose';

export type AddressUserDocument = AddressUser & Document;

@Schema()
export class AddressUser {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  addressLine1: string;

  @Prop()
  addressLine2: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  country: string;

  @Prop()
  lat: string;

  @Prop()
  lng: string;
}

export const AddressSchema = SchemaFactory.createForClass(AddressUser);

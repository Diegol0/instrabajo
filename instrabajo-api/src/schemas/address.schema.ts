import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AddressDocument = Address & Document;

@Schema()
export class Address {
  @Prop({ required: true })
  address1: string;

  @Prop()
  address2: number;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  lat: string;

  @Prop()
  lng: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);

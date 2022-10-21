import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AddressDocument = Address & Document;

@Schema()
export class Address {

  @Prop({ required: true })
  userId: string;
  
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  addressLine1: string;

  @Prop({ required: true })
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

export const AddressSchema = SchemaFactory.createForClass(Address);

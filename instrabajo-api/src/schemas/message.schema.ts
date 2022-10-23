import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema()
export class Message {

  @Prop({ required: true })
  addressLine1: string;

  @Prop({ required: true })
  addressLine2: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  country: string;

  @Prop()
  lat: number;

  @Prop()
  lng: number;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
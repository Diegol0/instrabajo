import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema()
export class Message {

  @Prop({ required: true })
  jobId: string;

  @Prop({ required: true })
  fromUserId: string;
  @Prop({ required: true })
  toUserId: string;

  @Prop({ required: true })
  message: string;

  @Prop()
  read: boolean;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
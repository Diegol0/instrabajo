import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MessageNegotiationDocument = MessageNegotiation & Document;

@Schema()
export class MessageNegotiation {
  @Prop({ required: true })
  jobUserId: string;

  @Prop({ required: true })
  fromUserId: string;

  @Prop({ required: true })
  toUserId: string;

  @Prop({ required: true })
  message: string;

  @Prop()
  read: boolean;
}

export const MessageNegotiationSchema =
  SchemaFactory.createForClass(MessageNegotiation);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReviewDocument = Review & Document;

@Schema()
export class Review {
  @Prop()
  userId: string;
  @Prop()
  jobId: string;
  @Prop()
  nameJob: string;
  @Prop()
  Comment: string;
  @Prop()
  stars: number;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);

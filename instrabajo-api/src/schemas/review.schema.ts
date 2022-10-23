import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReviewDocument = Review & Document;

@Schema()
export class Review {

  @Prop()
  userId: number;
  @Prop()
  jobId: number;   

  @Prop()
  Comment: string;

  @Prop()
  stars: number;


}

export const ReviewSchema = SchemaFactory.createForClass(Review);

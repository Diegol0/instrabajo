import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EmployerDocument = Employer & Document;

@Schema()
export class Employer {
  @Prop({ required: true })
  name: string;

  @Prop()
  lastname: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  email: string;
}

export const EmployerSchema = SchemaFactory.createForClass(Employer);

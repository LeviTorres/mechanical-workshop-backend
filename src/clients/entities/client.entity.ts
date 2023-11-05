import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Client extends Document {
  @Prop({ required: true, unique: true })
  key_client: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  phone_number: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: false })
  address: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  createdAt: number;

  @Prop()
  updatedAt: number;
}

export const ClientSchema = SchemaFactory.createForClass(Client);

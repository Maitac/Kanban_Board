



import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Card extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop({ required: true, index: true }) 
  columnId: string;

  @Prop({ required: true, default: 0 })
  order: number;
}

export const CardSchema = SchemaFactory.createForClass(Card);




import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CardDocument = HydratedDocument<Card>;

@Schema()
export class Card {
  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string; 

  @Prop({ required: true })
  columnId: string; // Para asociar la tarjeta a una columna

  @Prop({ default: 0 }) // Para el orden de las tarjetas dentro de una columna
  order: number;
}

export const CardSchema = SchemaFactory.createForClass(Card);
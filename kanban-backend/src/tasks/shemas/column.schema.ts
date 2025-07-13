


import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Card, CardSchema } from './card.schema'; 

@Schema()
export class Column extends Document {
  @Prop({ required: true })
  title: string;

  // Las tarjetas se almacenarán como subdocumentos dentro de la columna

  @Prop({ type: [CardSchema], default: [] })
  cards: Card[];
}

export const ColumnSchema = SchemaFactory.createForClass(Column);



import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ColumnDocument = HydratedDocument<Column>;

@Schema()
export class Column {
  @Prop({ required: true }) 
  title: string;

  @Prop({ default: 0 }) // Se añade un valor por defecto para 'order'
  order: number;
}

export const ColumnSchema = SchemaFactory.createForClass(Column);


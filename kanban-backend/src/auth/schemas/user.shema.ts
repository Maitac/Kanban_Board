

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true, unique: true }) // El email, único y obligatorio
  email: string;

  @Prop({ required: true }) // La contraseña (hasheada) será obligatoria
  password: string;

  @Prop({ required: true, default: 'Guest' }) // Nombre de usuario
  username: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
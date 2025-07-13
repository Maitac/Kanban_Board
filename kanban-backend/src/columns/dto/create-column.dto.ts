

import { IsNotEmpty, IsString, IsOptional, IsInt, Min } from 'class-validator';

export class CreateColumnDto {
  @IsString()
  @IsNotEmpty({ message: 'El título de la columna no puede estar vacío.' })
  title: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;
}
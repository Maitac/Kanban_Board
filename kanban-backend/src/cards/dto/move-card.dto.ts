
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class MoveCardDto {
  @IsString()
  @IsNotEmpty()
  sourceColumnId: string; // ID de la columna de origen

  @IsString()
  @IsNotEmpty()
  destinationColumnId: string; // ID de la columna de destino

  @IsNumber()
  @IsNotEmpty()
  newOrder: number; // El nuevo índice (orden) dentro de la columna de destino
}
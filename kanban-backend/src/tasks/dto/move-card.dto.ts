


import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class MoveCardDto {
  @IsString()
  @IsNotEmpty()
  cardId: string;

  @IsString()
  @IsNotEmpty()
  sourceColumnId: string;

  @IsString()
  @IsNotEmpty()
  destinationColumnId: string;

  @IsNumber()
  @IsNotEmpty()
  newIndex: number; // La nueva posición de la tarjeta en la columna de destino
}

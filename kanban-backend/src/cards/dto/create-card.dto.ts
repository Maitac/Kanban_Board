
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';


export class CreateCardDto {
  @IsNotEmpty() 
  @IsString()  
  title: string;

  @IsString()
  @IsOptional() 
  description?: string; 

  @IsNotEmpty() 
  @IsString()  
  columnId: string;

}
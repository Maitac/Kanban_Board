

import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';

// Bebe estar instlado class-validator y class-transformer


export class AuthCredentialsDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Password must be at least 6 characters long' }) // De 6 caracteres
  password: string;
}

export class RegisterUserDto extends AuthCredentialsDto {
  @IsString()
  @IsNotEmpty()
  username: string; // Registro
}
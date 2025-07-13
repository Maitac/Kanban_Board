


import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto, RegisterUserDto } from './dto/auth.dto'; // Importa los DTOs

@Controller('auth') // Todas las rutas de este controlador comenzarán con /auth
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  // @HttpCode(HttpStatus.CREATED) // 
  async signUp(@Body() registerUserDto: RegisterUserDto): Promise<{ token: string }> {
  
    return this.authService.signUp(registerUserDto.email, registerUserDto.password, registerUserDto.username);
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK) // Envía un 200 OK para el login exitoso
  async signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<{ token: string }> {
    // Llama al método signIn del servicio
    return this.authService.signIn(authCredentialsDto.email, authCredentialsDto.password);
  }
}



import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service'; 

//  Payload del JWT
export interface JwtPayload {
  email: string;
  sub: string; // ID de usuario
  username: string; // Nombre de usuario
  iat?: number;
  exp?: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private authService: AuthService, 
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extrae el token del header Authorization: Bearer <token>
      ignoreExpiration: false, // Token debe ser válido y no expirado
      secretOrKey: configService.get<string>('JWT_SECRET'), // Clave secreta para verificar el token
    });
  }

  // Después de validar el token.

  async validate(payload: JwtPayload) {
    
    return { userId: payload.sub, username: payload.username, email: payload.email };
  }
}
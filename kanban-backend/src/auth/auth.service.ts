

import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt'; 
import { User, UserDocument } from './schemas/user.shema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService, 
  ) {}

  // Método para registrar un nuevo usuario
  async signUp(email: string, password: string, username: string): Promise<{ token: string }> {
    // 1. Verificar si el email ya existe
    const existingUser = await this.userModel.findOne({ email }).exec();
    if (existingUser) {
      throw new ConflictException('Email already exists'); // Conflict si el email ya está en uso
    }

    // 2. Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10); // El 10 es el "salt rounds"

    // 3. Crear y guardar el nuevo usuario
    const newUser = new this.userModel({ email, password: hashedPassword, username });
    await newUser.save();

    // 4. Generar y retornar el JWT
    const payload = { email: newUser.email, sub: newUser._id, username: newUser.username };
    const token = this.jwtService.sign(payload); // Firma el token

    return { token };
  }

  // Método para iniciar sesión
  async signIn(email: string, password: string): Promise<{ token: string }> {
    // 1. Buscar al usuario por email
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new UnauthorizedException('Invalid credentials'); // Credenciales inválidas si no se encuentra el email
    }

    // 2. Comparar la contraseña hasheada
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials'); // Credenciales inválidas si la contraseña no coincide
    }

    // 3. Generar y retornar el JWT
    const payload = { email: user.email, sub: user._id, username: user.username };
    const token = this.jwtService.sign(payload);

    return { token };
  }
}
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UserDocument } from '../schemas/user.schema';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // Valida usuário e retorna erros específicos
  async validateUser(email: string, password: string): Promise<Omit<UserDocument, 'password'>> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Email não encontrado');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Senha incorreta');
    }

    const userObj = user.toObject();
    delete userObj.password;
    return userObj;
  }

  // Login
  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    const payload = { sub: user._id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async register(userData: Partial<UserDocument>) {
    if (!userData.password) {
      throw new Error('Senha é obrigatória');
    }

    return this.usersService.create(userData);
  }

  async registerAdmin(userData: Partial<UserDocument>) {
    userData.role = 'admin';

    if (!userData.password) {
      throw new Error('Senha é obrigatória');
    }

    return this.usersService.create(userData);
  }
}

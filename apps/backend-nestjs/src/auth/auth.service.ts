import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UserDocument } from '../schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // Valida usuário e retorna sem a senha
  async validateUser(email: string, password: string): Promise<Omit<UserDocument, 'password'> | null> {
    const user = await this.usersService.findByEmail(email);
    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return null;

    // Converte o documento Mongoose para objeto JS e remove a senha
    const userObj = user.toObject();
    delete userObj.password;
    return userObj;
  }

  // Login
  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    if (!user) throw new UnauthorizedException('Credenciais inválidas');

    const payload = { sub: user._id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  // Registro
  async register(userData: Partial<UserDocument>) {
    if (!userData.password) {
      throw new Error('Senha é obrigatória');
    }

    // Hash da senha
    const salt = await bcrypt.genSalt(10);
    userData.password = await bcrypt.hash(userData.password, salt);

    return this.usersService.create(userData);
  }
}

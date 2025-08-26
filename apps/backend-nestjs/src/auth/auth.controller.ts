import { Controller, Post, Body, ForbiddenException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDocument } from '../schemas/user.schema';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Login
  @Post('login')
  async login(
    @Body() body: { email: string; password: string }
  ) {
    return this.authService.login(body.email, body.password);
  }

  // Registrar usuário comum
  @Post('register')
  async register(
    @Body() body: Partial<UserDocument>
  ) {
    // 🔒 força a role sempre como "user"
    const userData: Partial<UserDocument> = {
      ...body,
      role: 'user',
    };
    return this.authService.register(userData);
  }

  // Registrar administrador (com chave secreta)
  @Post('register-admin')
  async registerAdmin(
    @Body() body: Partial<UserDocument> & { secretKey: string }
  ) {
    if (body.secretKey !== process.env.ADMIN_CREATION_KEY) {
      throw new ForbiddenException('Chave de autorização inválida');
    }

    // 🔒 força a role sempre como "admin"
    const adminData: Partial<UserDocument> = {
      ...body,
      role: 'admin',
    };

    return this.authService.registerAdmin(adminData);
  }
}

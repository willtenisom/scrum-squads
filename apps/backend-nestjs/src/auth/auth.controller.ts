import { Controller, Post, Body } from '@nestjs/common';
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

  // Registrar usuário
  @Post('register')
  async register(
    @Body() body: Partial<UserDocument>
  ) {
    return this.authService.register(body);
  }
}

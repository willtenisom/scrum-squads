import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET')!, // pega do .env
    });
  }

  async validate(payload: any) {
  const user = await this.usersService.findById(payload.sub.toString());
  if (!user) throw new UnauthorizedException('Usuário não encontrado');

  return {
    id: user._id,
    nome: user.nome,
    email: user.email,
    role: user.role,
    turmaId: user.turmaId,
    squadId: user.squadId,
  };
}
}

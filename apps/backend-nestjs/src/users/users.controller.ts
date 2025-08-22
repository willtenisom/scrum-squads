import { Controller, Get, Post, Put, Delete, Body, Param, Query, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../common/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Perfil próprio (JWT)
  @Get('me')
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req: any) {
    return req.user;
  }

  // Listar alunos da própria turma (sem JWT)
  @Get()
  listByNameAndTurma(@Query('nome') nome: string, @Query('turmaId') turmaId: number) {
    if (!nome || !turmaId) return { error: 'Informe nome completo e turmaId para acessar a lista' };

    const requester = this.usersService.findByNameAndTurma(nome, turmaId);
    if (!requester) return { error: 'Acesso negado: nome ou turma inválidos' };

    return this.usersService.findAllByTurma(turmaId);
  }

  // CRUD admin
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  createUser(@Body() body: any) {
    return this.usersService.create(body);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  updateUser(@Param('id') id: string, @Body() body: any) {
    return this.usersService.update(Number(id), body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  deleteUser(@Param('id') id: string) {
    return this.usersService.remove(Number(id));
  }

  // Apenas admins podem acessar este endpoint de teste
  @Get('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  onlyAdmins() {
    return { message: 'Somente admin acessa isso 🚀' };
  }
}

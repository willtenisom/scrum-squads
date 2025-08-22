import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  Delete,
  Query,
  BadRequestException,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AlunosService } from '../services/alunos.service';
import { CreateAlunoDto } from '../entities/dto/create-aluno.dto';
import { UpdateAlunoDto } from '../entities/dto/update-aluno.dto';
import { Aluno } from '../schemas/aluno.schema';
import { JwtAuthGuard } from '../common/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('alunos')
export class AlunosController {
  constructor(private readonly alunosService: AlunosService) {}

  // Criar novo aluno → apenas admin
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async create(@Body() dto: CreateAlunoDto): Promise<Aluno> {
    try {
      return await this.alunosService.create(dto);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Erro desconhecido ao criar aluno.');
    }
  }

  // Listar alunos → qualquer aluno pode listar a própria turma
  @Get()
  async findAll(@Query('nome') nome: string, @Query('turmaId') turmaId: string): Promise<Aluno[]> {
    if (!nome || !turmaId) {
      throw new BadRequestException('Informe nome completo e turmaId para acessar a lista.');
    }

    const requester = await this.alunosService.findByNameAndTurma(nome, Number(turmaId));
    if (!requester) {
      throw new BadRequestException('Acesso negado.');
    }

    return this.alunosService.findAllByTurma(Number(turmaId));
  }

  // Buscar aluno por ID → apenas admin
  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async findOne(@Param('id') id: string): Promise<Aluno> {
    return this.alunosService.findById(id);
  }

  // Atualizar aluno → apenas admin
  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async update(@Param('id') id: string, @Body() dto: UpdateAlunoDto): Promise<Aluno> {
    return this.alunosService.update(id, dto);
  }

  // Remover aluno → apenas admin
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    await this.alunosService.remove(id);
    return { message: `Aluno com ID "${id}" removido com sucesso.` };
  }
}

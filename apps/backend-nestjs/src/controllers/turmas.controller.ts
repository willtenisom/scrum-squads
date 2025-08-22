import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  Delete,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { TurmasService, TurmaWithAlunos } from '../services/turmas.service';
import { CreateTurmaDto } from '../entities/dto/create-turma.dto';
import { UpdateTurmaDto } from '../entities/dto/update-turma.dto';
import { Turma } from '../schemas/turma.schema';
import { Aluno } from '../schemas/aluno.schema';
import { JwtAuthGuard } from '../common/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('turmas')
export class TurmasController {
  constructor(private readonly turmasService: TurmasService) {}

  // Criar nova turma → apenas admin
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async create(@Body() dto: CreateTurmaDto): Promise<Turma> {
    try {
      return await this.turmasService.create(dto);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Erro desconhecido ao criar turma.');
    }
  }

  // Buscar todas as turmas → qualquer aluno autenticado
  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<Turma[]> {
    return this.turmasService.findAll();
  }

  // Buscar turma por ID → qualquer aluno autenticado
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string): Promise<Turma> {
    return this.turmasService.findById(id);
  }

  // Atualizar turma → apenas admin
  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async update(@Param('id') id: string, @Body() dto: UpdateTurmaDto): Promise<Turma> {
    return this.turmasService.update(id, dto);
  }

  // Remover turma → apenas admin
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    await this.turmasService.remove(id);
    return { message: `Turma com ID "${id}" removida com sucesso.` };
  }

  // Adicionar aluno à turma → apenas admin
  @Post(':id/alunos/:alunoId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async addAluno(
    @Param('id') turmaId: string,
    @Param('alunoId') alunoId: string,
  ): Promise<TurmaWithAlunos> {
    return this.turmasService.addAluno(turmaId, alunoId);
  }

  // Listar todos os alunos da turma → qualquer aluno autenticado
  @Get(':id/alunos')
  @UseGuards(JwtAuthGuard)
  async getAlunos(@Param('id') turmaId: string): Promise<Aluno[]> {
    return this.turmasService.getAlunosByTurma(turmaId);
  }
}

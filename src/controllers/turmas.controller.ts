import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  Delete,
} from '@nestjs/common';
import { TurmasService } from '../services/turmas.service';
import { CreateTurmaDto } from '../entities/dto/create-turma.dto';
import { UpdateTurmaDto } from '../entities/dto/update-turma.dto';
import { Turma } from '../schemas/turma.schema';
import { Aluno } from '../schemas/aluno.schema';

@Controller('turmas')
export class TurmasController {
  constructor(private readonly turmasService: TurmasService) {}

  // Criar nova turma
  @Post()
  async create(@Body() dto: CreateTurmaDto): Promise<Turma> {
    return this.turmasService.create(dto);
  }

  // Buscar todas as turmas
  @Get()
  async findAll(): Promise<Turma[]> {
    return this.turmasService.findAll();
  }

  // Buscar turma por ID
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Turma> {
    return this.turmasService.findById(id);
  }

  // Atualizar turma
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateTurmaDto,
  ): Promise<Turma> {
    return this.turmasService.update(id, dto);
  }

  // Remover turma
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.turmasService.remove(id);
  }

  // Adicionar aluno à turma
  @Post(':id/alunos/:alunoId')
  async addAluno(
    @Param('id') turmaId: string,
    @Param('alunoId') alunoId: string,
  ): Promise<Turma> {
    return this.turmasService.addAluno(turmaId, alunoId);
  }

  // Listar todos os alunos da turma
  @Get(':id/alunos')
  async getAlunos(@Param('id') turmaId: string): Promise<Aluno[]> {
    return this.turmasService.getAlunosByTurma(turmaId);
  }
}

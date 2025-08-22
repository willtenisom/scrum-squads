import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { TurmasService } from '../services/turmas.service';
import { TurmaWithAlunos } from '../services/turmas.service';
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
    try {
      return await this.turmasService.create(dto);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Erro desconhecido ao criar turma.');
    }
  }

  // Buscar todas as turmas
  @Get()
  async findAll(): Promise<Turma[]> {
    return this.turmasService.findAll();
  }

  // Buscar turma por ID
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Turma> {
    return this.turmasService.findById(id); // service já lança NotFoundException se não achar
  }

  // Atualizar turma
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateTurmaDto,
  ): Promise<Turma> {
    return this.turmasService.update(id, dto); // service já lança NotFoundException se não achar
  }

  // Remover turma
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    await this.turmasService.remove(id); // service já lança NotFoundException se não achar
    return { message: `Turma com ID "${id}" removida com sucesso.` };
  }

  // Adicionar aluno à turma
  @Post(':id/alunos/:alunoId')
async addAluno(
  @Param('id') turmaId: string,
  @Param('alunoId') alunoId: string,
): Promise<TurmaWithAlunos> {  // ✅ aqui
  return this.turmasService.addAluno(turmaId, alunoId);
}

  // Listar todos os alunos da turma
  @Get(':id/alunos')
  async getAlunos(@Param('id') turmaId: string): Promise<Aluno[]> {
    return this.turmasService.getAlunosByTurma(turmaId); // service lida com erros
  }
}

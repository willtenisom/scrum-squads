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
import { AlunosService } from '../services/alunos.service';
import { CreateAlunoDto } from '../entities/dto/create-aluno.dto';
import { UpdateAlunoDto } from '../entities/dto/update-aluno.dto';
import { Aluno } from '../schemas/aluno.schema';

@Controller('alunos')
export class AlunosController {
  constructor(private readonly alunosService: AlunosService) {}

  // Criar novo aluno
  @Post()
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

  // Buscar todos os alunos
  @Get()
  async findAll(): Promise<Aluno[]> {
    return this.alunosService.findAll();
  }

  // Buscar aluno por ID
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Aluno> {
    return this.alunosService.findById(id); // service lança NotFoundException se não achar
  }

  // Atualizar aluno
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateAlunoDto,
  ): Promise<Aluno> {
    return this.alunosService.update(id, dto); // service lança NotFoundException se não achar
  }

  // Remover aluno
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    await this.alunosService.remove(id); // service lança NotFoundException se não achar
    return { message: `Aluno com ID "${id}" removido com sucesso.` };
  }
}

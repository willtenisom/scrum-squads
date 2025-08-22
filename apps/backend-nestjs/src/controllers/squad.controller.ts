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
import { SquadsService } from '../services/squads.service';
import { CreateSquadDto } from '../entities/dto/create-squad.dto';
import { UpdateSquadDto } from '../entities/dto/update-squad.dto';
import { Squad } from '../schemas/squad.schema';
import { Aluno } from '../schemas/aluno.schema';

@Controller('squads')
export class SquadsController {
  constructor(private readonly squadsService: SquadsService) {}

  // Criar novo squad
  @Post()
  async create(@Body() dto: CreateSquadDto): Promise<Squad> {
    try {
      return await this.squadsService.create(dto);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Erro desconhecido ao criar squad.');
    }
  }

  // Listar todos os squads
  @Get()
  async findAll(): Promise<Squad[]> {
    return this.squadsService.findAll();
  }

  // Buscar squad por ID
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Squad> {
    return this.squadsService.findById(id); // service lança NotFoundException se não achar
  }

  // Atualizar squad
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateSquadDto,
  ): Promise<Squad> {
    return this.squadsService.update(id, dto); // service lança NotFoundException se não achar
  }

  // Remover squad
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    await this.squadsService.remove(id); // service lança NotFoundException se não achar
    return { message: `Squad com ID "${id}" removido com sucesso.` };
  }

  // Adicionar aluno ao squad
  @Post(':id/alunos/:alunoId')
  async addAluno(
    @Param('id') squadId: string,
    @Param('alunoId') alunoId: string,
  ): Promise<Squad> {
    return this.squadsService.addAluno(squadId, alunoId); // service lida com erros
  }

  // Listar todos os alunos do squad
  @Get(':id/alunos')
  async getAlunos(@Param('id') squadId: string): Promise<Aluno[]> {
    return this.squadsService.getAlunosBySquad(squadId); // service lida com erros
  }
}

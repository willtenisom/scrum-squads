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
  Req,
} from '@nestjs/common';
import { SquadsService } from '../services/squads.service';
import { CreateSquadDto } from '../entities/dto/create-squad.dto';
import { UpdateSquadDto } from '../entities/dto/update-squad.dto';
import { Squad } from '../schemas/squad.schema';
import { Aluno } from '../schemas/aluno.schema';
import { JwtAuthGuard } from '../common/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('squads')
export class SquadsController {
  constructor(private readonly squadsService: SquadsService) {}

  // Criar novo squad → apenas admin
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
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

  // Listar todos os squads → qualquer aluno autenticado
  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<Squad[]> {
    return this.squadsService.findAll();
  }

  // Buscar squad por ID → qualquer aluno autenticado
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string): Promise<Squad> {
    return this.squadsService.findById(id);
  }

  // Atualizar squad → apenas admin
  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async update(@Param('id') id: string, @Body() dto: UpdateSquadDto): Promise<Squad> {
    return this.squadsService.update(id, dto);
  }

  // Remover squad → apenas admin
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    await this.squadsService.remove(id);
    return { message: `Squad com ID "${id}" removido com sucesso.` };
  }

  // Adicionar aluno ao squad → apenas admin
  @Post(':id/alunos/:alunoId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async addAluno(@Param('id') squadId: string, @Param('alunoId') alunoId: string): Promise<Squad> {
    return this.squadsService.addAluno(squadId, alunoId);
  }

  // Listar todos os alunos do squad → qualquer aluno autenticado
  @Get(':id/alunos')
  @UseGuards(JwtAuthGuard)
  async getAlunos(@Param('id') squadId: string): Promise<Aluno[]> {
    return this.squadsService.getAlunosBySquad(squadId);
  }
}

import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  Delete,
} from '@nestjs/common';
import { AlunosService } from '../services/aluno.service';
import { CreateAlunoDto } from '../entities/dto/create-aluno.dto';
import { UpdateAlunoDto } from '../entities/dto/update-aluno.dto';
import { Aluno } from '../schemas/aluno.schema';

@Controller('alunos')
export class AlunosController {
  constructor(private readonly alunosService: AlunosService) {}

  @Post()
  async create(@Body() dto: CreateAlunoDto): Promise<Aluno> {
    return this.alunosService.create(dto);
  }

  @Get()
  async findAll(): Promise<Aluno[]> {
    return this.alunosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Aluno> {
    return this.alunosService.findById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateAlunoDto,
  ): Promise<Aluno> {
    return this.alunosService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.alunosService.remove(id);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Turma, TurmaDocument } from '../schemas/turma.schema';
import { Aluno, AlunoDocument } from '../schemas/aluno.schema';
import { CreateTurmaDto } from '../entities/dto/create-turma.dto';
import { UpdateTurmaDto } from '../entities/dto/update-turma.dto';

@Injectable()
export class TurmasService {
  constructor(
    @InjectModel(Turma.name)
    private readonly turmaModel: Model<TurmaDocument>,

    @InjectModel(Aluno.name)
    private readonly alunoModel: Model<AlunoDocument>,
  ) {}

  async create(dto: CreateTurmaDto): Promise<Turma> {
    const turma = new this.turmaModel(dto);
    return turma.save();
  }

  async findAll(): Promise<Turma[]> {
    return this.turmaModel.find().exec();
  }

  async findById(id: string): Promise<Turma> {
    const turma = await this.turmaModel.findById(id).exec();
    if (!turma) {
      throw new NotFoundException(`Turma com ID ${id} não encontrada`);
    }
    return turma;
  }

  async update(id: string, dto: UpdateTurmaDto): Promise<Turma> {
    const turma = await this.turmaModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();

    if (!turma) {
      throw new NotFoundException(`Turma com ID ${id} não encontrada`);
    }

    return turma;
  }

  async remove(id: string): Promise<void> {
    const result = await this.turmaModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Turma com ID ${id} não encontrada`);
    }
  }

  async addAluno(turmaId: string, alunoId: string): Promise<Turma> {
    const turma = await this.turmaModel.findById(turmaId);
    const aluno = await this.alunoModel.findById(alunoId);

    if (!turma) {
      throw new NotFoundException(`Turma com ID ${turmaId} não encontrada`);
    }

    if (!aluno) {
      throw new NotFoundException(`Aluno com ID ${alunoId} não encontrado`);
    }

    if (!turma.alunos.includes(aluno._id)) {
      turma.alunos.push(aluno._id);
      await turma.save();
    }

    return turma;
  }

  async getAlunosByTurma(turmaId: string): Promise<Aluno[]> {
    const turma = await this.turmaModel
      .findById(turmaId)
      .populate<{ alunos: Aluno[] }>('alunos')
      .exec();

    if (!turma) {
      throw new NotFoundException(`Turma com ID ${turmaId} não encontrada`);
    }

    return turma.alunos;
  }
}

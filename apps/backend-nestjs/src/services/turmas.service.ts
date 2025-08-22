import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Turma, TurmaDocument } from '../schemas/turma.schema';
import { Aluno, AlunoDocument } from '../schemas/aluno.schema';
import { CreateTurmaDto } from '../entities/dto/create-turma.dto';
import { UpdateTurmaDto } from '../entities/dto/update-turma.dto';

export type TurmaWithAlunos = Turma & { alunos: Aluno[] }; 

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
    if (!turma) throw new NotFoundException(`Turma com ID ${id} não encontrada.`);
    return turma;
  }

  async update(id: string, dto: UpdateTurmaDto): Promise<Turma> {
    const turma = await this.turmaModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    if (!turma) throw new NotFoundException(`Turma com ID ${id} não encontrada.`);
    return turma;
  }

  async remove(id: string): Promise<void> {
    const result = await this.turmaModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException(`Turma com ID ${id} não encontrada.`);
  }

  // ✅ Adiciona aluno e retorna turma com alunos populados
  async addAluno(turmaId: string, alunoId: string): Promise<TurmaWithAlunos> {
    if (!Types.ObjectId.isValid(turmaId) || !Types.ObjectId.isValid(alunoId)) {
      throw new BadRequestException('ID inválido.');
    }

    const turma = await this.turmaModel.findById(turmaId);
    if (!turma) throw new NotFoundException(`Turma com ID ${turmaId} não encontrada.`);

    const aluno = await this.alunoModel.findById(alunoId);
    if (!aluno) throw new NotFoundException(`Aluno com ID ${alunoId} não encontrado.`);

    if (!turma.alunos.includes(aluno._id)) {
      turma.alunos.push(aluno._id);
      await turma.save();
    }

    return (await turma.populate('alunos')) as TurmaWithAlunos;
  }

  // ✅ Retorna todos os alunos da turma, populados
  async getAlunosByTurma(turmaId: string): Promise<Aluno[]> {
    if (!Types.ObjectId.isValid(turmaId)) throw new BadRequestException('ID inválido.');

    const turma = await this.turmaModel.findById(turmaId).populate<{ alunos: Aluno[] }>('alunos');
    if (!turma) throw new NotFoundException(`Turma com ID ${turmaId} não encontrada.`);

    return turma.alunos;
  }
}

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
    @InjectModel(Turma.name) private readonly turmaModel: Model<TurmaDocument>,
    @InjectModel(Aluno.name) private readonly alunoModel: Model<AlunoDocument>,
  ) {}

  // Criar turma → admin-only
  async create(dto: CreateTurmaDto): Promise<Turma> {
    const turma = new this.turmaModel(dto);
    return turma.save();
  }

  // Listar todas as turmas → qualquer aluno autenticado
  async findAll(): Promise<Turma[]> {
    return this.turmaModel.find().exec();
  }

  // Buscar turma por ID → qualquer aluno autenticado
  async findById(id: string): Promise<Turma> {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestException('ID inválido.');
    const turma = await this.turmaModel.findById(id).exec();
    if (!turma) throw new NotFoundException(`Turma com ID ${id} não encontrada.`);
    return turma;
  }

  // Atualizar turma → admin-only
  async update(id: string, dto: UpdateTurmaDto): Promise<Turma> {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestException('ID inválido.');
    const turma = await this.turmaModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    if (!turma) throw new NotFoundException(`Turma com ID ${id} não encontrada.`);
    return turma;
  }

  // Remover turma → admin-only
  async remove(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestException('ID inválido.');
    const result = await this.turmaModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException(`Turma com ID ${id} não encontrada.`);
  }

  // Adicionar aluno → admin-only (mas pode ajustar se quiser que alunos adicionem a si mesmos)
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

  // Listar alunos da turma → qualquer aluno autenticado
  async getAlunosByTurma(turmaId: string): Promise<Aluno[]> {
    if (!Types.ObjectId.isValid(turmaId)) throw new BadRequestException('ID inválido.');

    const turma = await this.turmaModel
      .findById(turmaId)
      .populate<{ alunos: Aluno[] }>('alunos')
      .exec();

    if (!turma) throw new NotFoundException(`Turma com ID ${turmaId} não encontrada.`);
    return turma.alunos;
  }
}

import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Squad, SquadDocument } from '../schemas/squad.schema';
import { CreateSquadDto } from '../entities/dto/create-squad.dto';
import { UpdateSquadDto } from '../entities/dto/update-squad.dto';
import { Aluno, AlunoDocument } from '../schemas/aluno.schema';

@Injectable()
export class SquadsService {
  constructor(
    @InjectModel(Squad.name) private squadModel: Model<SquadDocument>,
    @InjectModel(Aluno.name) private alunoModel: Model<AlunoDocument>,
  ) {}

  // Criar squad
  async create(dto: CreateSquadDto): Promise<Squad> {
    try {
      const squad = new this.squadModel(dto);
      return await squad.save();
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Erro ao criar squad.');
    }
  }

  // Listar todos os squads
  async findAll(): Promise<Squad[]> {
    return this.squadModel.find().populate('alunos').exec();
  }

  // Buscar squad por ID
  async findById(id: string): Promise<Squad> {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestException('ID inválido.');
    const squad = await this.squadModel.findById(id).populate('alunos').exec();
    if (!squad) throw new NotFoundException(`Squad com ID "${id}" não encontrada.`);
    return squad;
  }

  // Atualizar squad
  async update(id: string, dto: UpdateSquadDto): Promise<Squad> {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestException('ID inválido.');
    const updated = await this.squadModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    if (!updated) throw new NotFoundException(`Squad com ID "${id}" não encontrada.`);
    return updated;
  }

  // Remover squad
  async remove(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestException('ID inválido.');
    const deleted = await this.squadModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException(`Squad com ID "${id}" não encontrada.`);
  }

  // Adicionar aluno a squad
  async addAluno(squadId: string, alunoId: string): Promise<Squad> {
    if (!Types.ObjectId.isValid(squadId) || !Types.ObjectId.isValid(alunoId)) {
      throw new BadRequestException('ID inválido.');
    }

    const squad = await this.squadModel.findById(squadId).exec();
    if (!squad) throw new NotFoundException(`Squad com ID "${squadId}" não encontrada.`);

    const aluno = await this.alunoModel.findById(alunoId).exec();
    if (!aluno) throw new NotFoundException(`Aluno com ID "${alunoId}" não encontrado.`);

    // Evita duplicidade
    if (!squad.alunos.includes(aluno._id)) {
      squad.alunos.push(aluno._id);
      await squad.save();
    }

    return squad.populate('alunos');
  }

 // Listar alunos de um squad
async getAlunosBySquad(squadId: string): Promise<Aluno[]> {
  const squad = await this.squadModel
    .findById(squadId)
    .populate<{ alunos: Aluno[] }>('alunos') 
    .exec();

  if (!squad) throw new NotFoundException(`Squad com ID "${squadId}" não encontrada.`);

  return squad.alunos;
}
}

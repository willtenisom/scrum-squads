import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Aluno, AlunoDocument } from '../schemas/aluno.schema';
import { CreateAlunoDto } from '../entities/dto/create-aluno.dto';
import { UpdateAlunoDto } from '../entities/dto/update-aluno.dto';

@Injectable()
export class AlunosService {
  constructor(
    @InjectModel(Aluno.name) private alunoModel: Model<AlunoDocument>,
  ) {}

  // Listar todos os alunos (admin)
  async findAll(): Promise<Aluno[]> {
    return this.alunoModel.find().exec();
  }

  // Buscar aluno por ID (admin)
  async findById(id: string): Promise<Aluno> {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestException('ID inválido.');
    const aluno = await this.alunoModel.findById(id).exec();
    if (!aluno) throw new NotFoundException(`Aluno com id ${id} não encontrado`);
    return aluno;
  }

  // Criar aluno (admin)
  async create(createAlunoDto: CreateAlunoDto): Promise<Aluno> {
    try {
      const createdAluno = new this.alunoModel(createAlunoDto);
      return await createdAluno.save();
    } catch (error: unknown) {
      throw new BadRequestException('Erro ao criar aluno. Verifique os dados enviados.');
    }
  }

  // Atualizar aluno (admin)
  async update(id: string, updateAlunoDto: UpdateAlunoDto): Promise<Aluno> {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestException('ID inválido.');
    const updatedAluno = await this.alunoModel.findByIdAndUpdate(id, updateAlunoDto, { new: true }).exec();
    if (!updatedAluno) throw new NotFoundException(`Aluno com id ${id} não encontrado`);
    return updatedAluno;
  }

  // Remover aluno (admin)
  async remove(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestException('ID inválido.');
    const result = await this.alunoModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException(`Aluno com id ${id} não encontrado`);
  }

  // 🔹 Verifica se o aluno requisitante existe na turma e com o nome informado
  async findByNameAndTurma(nome: string, turmaId: number): Promise<Aluno | null> {
    const aluno = await this.alunoModel.findOne({ nome, turma: turmaId }).exec();
    return aluno;
  }

  // 🔹 Retorna todos os alunos de uma turma (apenas quem passou na validação acima)
  async findAllByTurma(turmaId: number): Promise<Aluno[]> {
    return this.alunoModel.find({ turma: turmaId }).exec();
  }
}

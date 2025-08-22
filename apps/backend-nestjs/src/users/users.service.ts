import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  // Criar usuário (com hash de senha)
  async create(userData: Partial<User>): Promise<User> {
    if (!userData.password) throw new BadRequestException('Senha é obrigatória');
    const salt = await bcrypt.genSalt(10);
    userData.password = await bcrypt.hash(userData.password, salt);

    const user = new this.userModel(userData);
    return user.save();
  }

  // Listar todos os usuários
  async findAll(): Promise<User[]> {
    return this.userModel.find().select('-password').exec();
  }

  // Buscar usuário por ID
  async findById(id: string): Promise<User> {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestException('ID inválido.');
    const user = await this.userModel.findById(id).exec();
    if (!user) throw new NotFoundException('Usuário não encontrado');
    return user;
  }

  // Atualizar usuário (hash da senha se for alterada)
  async update(id: string, data: Partial<User>): Promise<User> {
    if (data.password) {
      const salt = await bcrypt.genSalt(10);
      data.password = await bcrypt.hash(data.password, salt);
    }
    const updated = await this.userModel.findByIdAndUpdate(id, data, { new: true }).exec();
    if (!updated) throw new NotFoundException('Usuário não encontrado');
    return updated;
  }

  // Remover usuário
  async remove(id: string): Promise<void> {
    const result = await this.userModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Usuário não encontrado');
  }

  // Buscar por email (login)
  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.userModel.findOne({ email }).exec();
    return user || undefined;
  }

  // Buscar usuário pelo nome e turma (para alunos)
  async findByNameAndTurma(nome: string, turmaId: string): Promise<User | null> {
    return this.userModel.findOne({ nome, turmaId }).exec();
  }

  // Listar todos os usuários de uma turma (sem senha)
  async findAllByTurma(turmaId: string): Promise<User[]> {
    return this.userModel.find({ turmaId }).select('-password').exec();
  }
}

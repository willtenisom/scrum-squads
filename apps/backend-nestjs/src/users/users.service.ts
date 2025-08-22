import { Injectable, NotFoundException } from '@nestjs/common';

export type User = {
  id: number;
  nome: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  turmaId?: number;
  squadId?: number;
};

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      nome: 'Admin Teste',
      email: 'admin@teste.com',
      password: '123456', // use bcryptjs para hash real depois
      role: 'admin',
      turmaId: 1,
      squadId: 1,
    },
  ];

  // Encontrar usuário pelo nome e turma (para acesso de alunos)
  findByNameAndTurma(nome: string, turmaId: number): User | undefined {
    return this.users.find(u => u.nome === nome && u.turmaId === Number(turmaId));
  }

  // Listar todos os alunos de uma turma (campos públicos)
  findAllByTurma(turmaId: number) {
    return this.users
      .filter(u => u.turmaId === Number(turmaId))
      .map(u => ({
        id: u.id,
        nome: u.nome,
        turmaId: u.turmaId,
        squadId: u.squadId,
      }));
  }

  // CRUD admin
  create(userData: Partial<User>) {
    const newUser: User = {
      id: this.users.length + 1,
      ...userData,
    } as User;
    this.users.push(newUser);
    return newUser;
  }

  findById(id: number) {
    const user = this.users.find(u => u.id === id);
    if (!user) throw new NotFoundException('Usuário não encontrado');
    return user;
  }

  update(id: number, data: Partial<User>) {
    const user = this.findById(id);
    Object.assign(user, data);
    return user;
  }

  remove(id: number) {
    const user = this.findById(id);
    this.users = this.users.filter(u => u.id !== id);
    return { message: 'Usuário removido com sucesso', user };
  }

  // Buscar por email (login)
  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(u => u.email === email);
  }
}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { TurmasModule } from './modules/turma.module';
import { AlunoModule } from './modules/aluno.module';

@Module({
  imports: [
    // Variáveis de ambiente globais
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Conexão com o MongoDB
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/seu-banco'),

    // Módulos da aplicação
    TurmasModule,
    AlunoModule,
  ],
})
export class AppModule {}

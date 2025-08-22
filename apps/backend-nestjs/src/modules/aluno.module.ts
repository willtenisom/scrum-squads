import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AlunosController } from '../controllers/aluno.controller';
import { AlunosService } from '../services/alunos.service';
import { Aluno, AlunoSchema } from '../schemas/aluno.schema';
import { Turma, TurmaSchema } from '../schemas/turma.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Aluno.name, schema: AlunoSchema },
      { name: Turma.name, schema: TurmaSchema },
    ]),
  ],
  controllers: [AlunosController],
  providers: [AlunosService],
  exports: [AlunosService],
})
export class AlunoModule {}

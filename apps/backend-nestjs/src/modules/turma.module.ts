import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TurmasController } from '../controllers/turmas.controller';
import { TurmasService } from '../services/turmas.service';
import { Turma, TurmaSchema } from '../schemas/turma.schema';
import { Aluno, AlunoSchema } from '../schemas/aluno.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Turma.name, schema: TurmaSchema },
      { name: Aluno.name, schema: AlunoSchema },
    ]),
  ],
  controllers: [TurmasController],
  providers: [TurmasService],
  exports: [TurmasService],
})
export class TurmasModule {}

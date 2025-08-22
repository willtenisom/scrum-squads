import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Aluno } from './aluno.schema';

export type TurmaDocument = Turma & Document;

@Schema({ timestamps: true })
export class Turma {
  @Prop({ required: true, unique: true })
  nome!: string;

  // Uma turma tem vários alunos
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Aluno' }], default: [] })
  alunos!: Types.ObjectId[];
}

export const TurmaSchema = SchemaFactory.createForClass(Turma);

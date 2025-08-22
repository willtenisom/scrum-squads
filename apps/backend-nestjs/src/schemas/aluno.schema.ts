import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Squad } from './squad.schema';

export type AlunoDocument = Aluno & Document;

@Schema({ timestamps: true })
export class Aluno {
  @Prop({ required: true })
  nome!: string;

  @Prop({ required: true, unique: true })
  email!: string;

  // Relacionamento com a turma
  @Prop({ type: Types.ObjectId, ref: 'Turma', required: true })
  turma!: Types.ObjectId;

  // Squad é opcional
  @Prop({ type: Types.ObjectId, ref: 'Squad', required: false })
  squad?: Types.ObjectId;
}

export const AlunoSchema = SchemaFactory.createForClass(Aluno);

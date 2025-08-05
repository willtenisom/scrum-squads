import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AlunoDocument = Aluno & Document;

@Schema({ timestamps: true })
export class Aluno {
  @Prop({ required: true })
  nome!: string;

  @Prop({ type: Types.ObjectId, ref: 'Turma', required: true })
  turma!: Types.ObjectId;

  @Prop({ required: false })
  squad?: string;
}

export const AlunoSchema = SchemaFactory.createForClass(Aluno);

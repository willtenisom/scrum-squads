import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Aluno } from './aluno.schema';

export type SquadDocument = Squad & Document;

@Schema({ timestamps: true })
export class Squad {
  @Prop({ required: true, unique: true })
  nome!: string;

  // Squad pode ter vários alunos
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Aluno' }], default: [] })
  alunos!: Types.ObjectId[];
}

export const SquadSchema = SchemaFactory.createForClass(Squad);

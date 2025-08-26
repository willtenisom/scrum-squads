import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  nome!: string;

  @Prop({ required: true, unique: true })
  email!: string;

  @Prop({ required: true })
  password!: string;

  @Prop({
    required: true,
    enum: ['admin', 'user', 'super_admin'], 
    default: 'user', 
  })
  role!: 'admin' | 'user' | 'super_admin';

  @Prop({ type: Types.ObjectId, ref: 'Turma', default: null })
  turmaId?: string;

  @Prop({ type: Types.ObjectId, ref: 'Squad', default: null })
  squadId?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & Document;

import { IsString, IsNotEmpty, IsOptional, IsArray, IsMongoId } from 'class-validator';

export class CreateSquadDto {
  @IsString()
  @IsNotEmpty()
  nome!: string;

  @IsOptional()
  @IsMongoId()
  turma?: string; // ID da turma

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  alunos?: string[]; // IDs dos alunos
}

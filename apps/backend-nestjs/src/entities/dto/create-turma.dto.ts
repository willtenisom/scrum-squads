import { IsString, IsNotEmpty, IsOptional, IsArray, IsMongoId } from 'class-validator';

export class CreateTurmaDto {
  @IsString()
  @IsNotEmpty()
  nome!: string;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  alunos?: string[]; // IDs dos alunos
}

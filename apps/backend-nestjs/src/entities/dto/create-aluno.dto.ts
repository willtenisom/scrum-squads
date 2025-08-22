import { IsString, IsNotEmpty, IsOptional, IsMongoId } from 'class-validator';

export class CreateAlunoDto {
  @IsString()
  @IsNotEmpty()
  nome!: string;

  @IsOptional()
  @IsMongoId()
  turma?: string; // ID da turma

  @IsOptional()
  @IsMongoId()
  squad?: string; // ID do squad (opcional)
}

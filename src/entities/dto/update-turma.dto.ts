import { IsOptional, IsString } from 'class-validator';

export class UpdateTurmaDto {
  @IsOptional()
  @IsString()
  nome?: string;

  @IsOptional()
  @IsString()
  descricao?: string;
}

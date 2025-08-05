import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAlunoDto {
  @IsString()
  @IsNotEmpty()
  nome!: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  squad?: string;
}

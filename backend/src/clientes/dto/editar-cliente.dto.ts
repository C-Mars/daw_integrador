import { IsEmail, IsOptional, IsString } from 'class-validator';

export class EditarClienteDto {
@IsOptional()
  id?:number;
  
  @IsOptional()
  @IsString()
  nombres?: string;

  @IsOptional()
  @IsString()
  apellidos?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}

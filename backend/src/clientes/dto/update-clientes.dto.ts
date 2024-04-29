import { IsOptional } from "class-validator";

export class UpdateClientesDto{

@IsOptional()
nombres: string;


@IsOptional()
apellidos: string;


@IsOptional()
email: string;


}
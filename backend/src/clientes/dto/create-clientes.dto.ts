import { IsNotEmpty, IsEmail, MinLength } from "class-validator";

export class CreateClientesDto{

@IsNotEmpty()
nombres: string;


@IsNotEmpty()
apellidos: string;


@IsEmail()
email: string;


}
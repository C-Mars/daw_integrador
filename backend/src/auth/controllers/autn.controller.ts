import { Body, Controller, Post } from "@nestjs/common";
import { loginDto } from "../dtos/login.dto";

@Controller('/auth')
export class AuthController{

    @Post()
    login(@Body() loginDto:loginDto){
        console.log('auth funciona')
    }
}
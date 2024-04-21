import { Body, Controller, Post } from "@nestjs/common";
import { LoginDto } from "../dtos/login.dto";
import { AuthService } from "../services/auth.service";

@Controller('/auth')
export class AuthController{

    constructor(private AuthService :AuthService){
        
    }

    @Post('/registro')
    registro(){
        return 'registro Funciono mierd'
    };

    @Post('/login')
    async login(@Body() loginDto:LoginDto){
        // console.log('auth funciona')
        return await this.AuthService.login(loginDto);
    }
}
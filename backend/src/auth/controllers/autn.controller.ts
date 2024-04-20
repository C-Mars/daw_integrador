import { Body, Controller, Post } from "@nestjs/common";
import { loginDto } from "../dtos/login.dto";
import { AuthService } from "../services/auth.service";

@Controller('/auth')
export class AuthController{

    constructor(private AuthService :AuthService){
        
    }

    @Post()
    async login(@Body() loginDto:loginDto){
        // console.log('auth funciona')
        return await this.AuthService.login(loginDto);
    }
}
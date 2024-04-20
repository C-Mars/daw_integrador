import { Injectable } from "@nestjs/common";
import { loginDto } from "../dtos/login.dto";


@Injectable()
export class AuthService{

    login(loginDto:loginDto){
        console.log('funciona service')
    }
}
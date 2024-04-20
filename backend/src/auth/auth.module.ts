import { Module } from "@nestjs/common";
import { AuthController } from "./controllers/autn.controller";
import { AuthService } from "./services/auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";


@Module({
    controllers:[AuthController],
    providers:[AuthService],
    imports:[TypeOrmModule.forFeature({Usuario})],
    exports:[]
})
export class AuthModule{}

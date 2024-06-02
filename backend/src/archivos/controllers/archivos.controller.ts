import { Controller, Get, Param, Res, UseGuards } from "@nestjs/common";
import { ArchivosService } from "../service/archivos.service";
import { ConfigService } from "@nestjs/config";
import { ApiBearerAuth } from "@nestjs/swagger";
import { Roles } from "src/auth/decorators/roles.decorator";
import { RolesEnum } from "src/auth/enums/roles.enum";
import { AuthGuard } from "src/auth/guards/auth.guard";
import { Response } from "express";



@Controller('file')
export class ArchivosController {
    constructor(private archivosService: ArchivosService,
        private configService: ConfigService,
        
    ) { }

    // @Get('usuarios/:imageName')
    // @ApiBearerAuth()
    // @Roles([RolesEnum.ADMINISTRADOR])
    // @UseGuards(AuthGuard)
    // getfoto(
    //     @Res() res: Response,
    //     @Param('imageName') imageName: string) {
    //     const path = this.archivosService.getStaticFoto(imageName);
    //     res.sendFile(path);
    // }
}
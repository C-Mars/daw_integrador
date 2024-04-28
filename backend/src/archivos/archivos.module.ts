import { Module } from "@nestjs/common";
import { ArchivosService } from "./service/archivos.service";


@Module({
    controllers: [],
    imports:[],
    providers: [ArchivosService],
    exports:[]
  })
  export class ArchivosModule {}
import { Module } from '@nestjs/common';
import { UsuariosController } from './controllers/usuarios.controller';
import { UsuariosService } from './services/usuarios.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';

import { ArchivosModule } from 'src/archivos/archivos.module';
import { ArchivosService } from 'src/archivos/service/archivos.service';


@Module({
  controllers: [UsuariosController],
  imports:[TypeOrmModule.forFeature([Usuario]),ArchivosModule],
  providers: [UsuariosService,ArchivosService],
  exports:[UsuariosService]
})
export class UsuariosModule {}

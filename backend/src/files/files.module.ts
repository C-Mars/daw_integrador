import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { UsuariosService } from 'src/usuarios/services/usuarios.service';

@Module({
  controllers: [FilesController],
  providers: [FilesService],
  imports:[TypeOrmModule.forFeature([Usuario]), UsuariosModule]
})
export class FilesModule {}

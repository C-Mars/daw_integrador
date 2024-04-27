import { Module } from '@nestjs/common';
import { UsuariosController } from './controllers/usuarios.controller';
import { UsuariosService } from './services/usuarios.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { FilesController } from 'src/files/files.controller';
import { FilesModule } from 'src/files/files.module';


@Module({
  controllers: [UsuariosController],
  imports:[TypeOrmModule.forFeature([Usuario])],
  providers: [UsuariosService],
  exports:[UsuariosService]
})
export class UsuariosModule {}

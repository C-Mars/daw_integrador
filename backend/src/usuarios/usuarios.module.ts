import { Module } from '@nestjs/common';
import { UsuariosController } from './controllers/usuarios.controller';
import { UsuariosService } from './services/usuarios.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { MulterModule } from '@nestjs/platform-express';
import { ArchivosModule } from 'src/archivos/archivos.module';
import { ArchivosService } from 'src/archivos/service/archivos.service';
import { ConfigService } from '@nestjs/config';


@Module({
  controllers: [UsuariosController],
  imports:[TypeOrmModule.forFeature([Usuario]),ArchivosModule,UsuariosModule,
  // MulterModule.register({
  //   dest: '../../static/usuarios',})
  ],
  providers: [UsuariosService,ArchivosService,ConfigService],
  exports:[UsuariosService]
})
export class UsuariosModule {}
// 
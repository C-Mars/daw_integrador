import { Module } from '@nestjs/common';
import { ActividadesController } from './controllers/actividades.controller';
import { ActividadesService } from './services/actividades.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Actividades } from './entities/actividades.entities';
import { UsuariosService } from 'src/usuarios/services/usuarios.service';
import { UsuariosController } from 'src/usuarios/controllers/usuarios.controller';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ActividadesController],
  providers: [ActividadesService],
  exports:[],
  imports:[TypeOrmModule.forFeature([Actividades]),UsuariosModule,
            AuthModule]
})
export class ActividadesModule {}

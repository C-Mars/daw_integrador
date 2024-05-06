import { Module } from '@nestjs/common';
import { AuditoriaController } from './controllers/auditoria.controller';
import { AuditoriaService } from './services/auditoria.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auditoria } from './entities/auditoria.entities';
import { ActividadesModule } from 'src/actividades/actividades.module';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [AuditoriaController],
  imports:[TypeOrmModule.forFeature([Auditoria]), ActividadesModule,
    UsuariosModule, AuthModule
  ],
  providers: [AuditoriaService]
})
export class AuditoriaModule {}

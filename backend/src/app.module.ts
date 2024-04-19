import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ActividadesModule } from './actividades/actividades.module';
import { AuditoriaModule } from './auditoria/auditoria.module';
import { ClientesModule } from './clientes/clientes.module';

@Module({
  imports: [AuthModule, UsuariosModule, ActividadesModule, AuditoriaModule, ClientesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

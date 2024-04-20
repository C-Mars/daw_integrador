import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ActividadesModule } from './actividades/actividades.module';
import { AuditoriaModule } from './auditoria/auditoria.module';
import { ClientesModule } from './clientes/clientes.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [AuthModule,TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'daw_luthier',
    password: 'EoWBJH3Z3tI(]O2X',
    database: 'appluthier',
    // entities: [__dirname + '/**/*.entity{.ts,.js}'],
    autoLoadEntities:true,
    synchronize: false
  }), UsuariosModule, ActividadesModule, AuditoriaModule, ClientesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

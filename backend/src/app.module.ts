import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ActividadesModule } from './actividades/actividades.module';
import { AuditoriaModule } from './auditoria/auditoria.module';
import { ClientesModule } from './clientes/clientes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { FilesModule } from './files/files.module';

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
    synchronize: false,
    logging:true,
    logger:'advanced-console'//puedo ver sql
  }), 
  JwtModule.register({
    global: true,
    secret: 'dawsecret',
    signOptions:{
      expiresIn: '24h'
    }
  }),
  UsuariosModule, ActividadesModule, AuditoriaModule, ClientesModule, FilesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

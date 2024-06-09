import { Module } from '@nestjs/common';
import { ClientesController } from './controllers/clientes.controller';
import { ClientesService } from './services/clientes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';

@Module({
  controllers: [ClientesController],
  imports: [TypeOrmModule.forFeature([Cliente])],
  providers: [ClientesService],
  exports: [ClientesService],
})
export class ClientesModule {}

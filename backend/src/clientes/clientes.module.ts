import { Module } from '@nestjs/common';
import { ClientesService } from './services/clientes.service';
import { ClientesController } from './controllers/clientes.controller';

@Module({
  providers: [ClientesService],
  controllers: [ClientesController]
})
export class ClientesModule {}

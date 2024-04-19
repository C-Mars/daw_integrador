import { Module } from '@nestjs/common';
import { ActividadesController } from './controllers/actividades.controller';
import { ActividadesService } from './services/actividades.service';

@Module({
  controllers: [ActividadesController],
  providers: [ActividadesService]
})
export class ActividadesModule {}

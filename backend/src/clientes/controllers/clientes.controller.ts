import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('clientes')
@Controller('clientes')
export class ClientesController {}

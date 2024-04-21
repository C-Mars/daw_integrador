import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));// Defino un interceptor(estructura de nest -milware) que intercepta las solicitudesuna vez que estan volviendo al cliente- intercepta las respuestas
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    forbidNonWhitelisted:true // Si pasan algo que no es el nest se encarga de rechazarlo
  }))
  await app.listen(3000);
}
bootstrap();

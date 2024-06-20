import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
 
  app.enableCors({origin:'*'});//habilita todos los origenes
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));// Defino un interceptor(estructura de nest -milware) que intercepta las solicitudesuna vez que estan volviendo al cliente- intercepta las respuestas
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    forbidNonWhitelisted:true // Si pasan algo que no es el nest se encarga de rechazarlo
  }))
  const config = new DocumentBuilder()
  .addBasicAuth()
  .build();
  const document = SwaggerModule.createDocument(app, config); //libreria sawwer
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();

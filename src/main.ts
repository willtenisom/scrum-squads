import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  dotenv.config(); // Carrega variáveis de ambiente do .env

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api'); // Prefixa todas as rotas com /api

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,            // Remove propriedades não declaradas no DTO
      forbidNonWhitelisted: true, // Retorna erro se tiver propriedades não declaradas
      transform: true,            // Transforma payloads automaticamente para classes
    }),
  );

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('Scrum Squad API')
    .setDescription('Documentação da API do Scrum Squad')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document); // Disponibiliza Swagger em /api/docs

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`🚀 Server running at http://localhost:${port}/api`);
  console.log(`📄 Swagger available at http://localhost:${port}/api/docs`);
}

bootstrap();

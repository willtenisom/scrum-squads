import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UsersService } from './users/users.service';

async function bootstrap() {
  // Cria contexto do NestJS sem rodar o servidor
  const app = await NestFactory.createApplicationContext(AppModule);

  const usersService = app.get(UsersService);

  try {
    // Cria usuário admin
    const admin = await usersService.create({
      nome: 'Admin Teste',
      email: 'admin@teste.com',
      password: 'piobello5',
      role: 'admin',
    });

    console.log('✅ Usuário admin criado:', admin.email);
  } catch (err: any) {
    console.error('❌ Erro ao criar usuário admin:', err.message);
  }

  await app.close();
}

bootstrap();

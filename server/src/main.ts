import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const openAPIConfig = new DocumentBuilder()
    .setTitle('Nest Next Shop')
    .setDescription('Nest Next Shop API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, openAPIConfig);
  SwaggerModule.setup('doc', app, document);

  const config = app.get(ConfigService);
  const port = config.get<number>('port') || 4000;
  await app.listen(port);
}
bootstrap();

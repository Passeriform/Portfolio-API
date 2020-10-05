import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  /* Causes conflict issues without FastifyV3 https://github.com/nestjs/swagger/issues/844
  * const options = new DocumentBuilder()
  *   .setTitle('Portfolio API')
  *   .setDescription('Simple, minimal, straightforward API as background for Portfolio.')
  *   .setVersion('1.0')
  *   .addTag('portfolio')
  *   .build();
  *
  * const document = SwaggerModule.createDocument(app, options);
  *
  * SwaggerModule.setup('api', app, document);
  */

  app.enableCors();
  await app.listen(<number>app.get('ConfigService').get('app.PORT') || 3000, app.get('ConfigService').get('app.HOST') || '0.0.0.0');
}

bootstrap();

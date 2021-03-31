import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
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

  const configService: ConfigService = app.get(ConfigService);

  app.enableCors();
  await app.listen(<number>configService.get('PORT') || 3000, <string>configService.get('HOST') || '0.0.0.0');
}

bootstrap();

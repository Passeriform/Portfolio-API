import { NestFactory } from '@nestjs/core';
import {
    FastifyAdapter,
    NestFastifyApplication
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

export const bootstrap = async () => {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  // Causes conflict issues without FastifyV3 https://github.com/nestjs/swagger/issues/844
  const options = new DocumentBuilder()
    .setTitle('Portfolio API')
    .setDescription('Simple, minimal, straightforward API as background for Portfolio.')
    .setVersion('1.0')
    .addTag('portfolio')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: [
      "http://localhost:4200",
      "https://passeriform.github.io",
      "https://www.passeriform.com",
    ],
  });

  return app;
}

import { ConfigService } from '@nestjs/config';
import { bootstrap } from './bootstrap';

export const startServer = async () => {
  const app = await bootstrap();
  const configService: ConfigService = app.get(ConfigService);
  await app.listen(<number>configService.get('PORT') || 3000, <string>configService.get('HOST') || '0.0.0.0');
}

startServer();

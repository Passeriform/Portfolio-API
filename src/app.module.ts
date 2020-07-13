import { Module } from '@nestjs/common';
import { WorkModule } from './work/work.module';
import { AboutModule } from './about/about.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), WorkModule, AboutModule],
})
export class AppModule {}

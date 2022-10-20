import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'aws-sdk';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: '*' });
  app.setGlobalPrefix('api');
  config.update({
    accessKeyId: 'AKIAYIRVS55JU7CC2E5G',
    secretAccessKey: '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',
    region: 'us-east-1',
  });
  await app.listen(3000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import cookiesParser from 'cookie-parser';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: { origin: process.env.NODE_ENV === 'production' ? 'https://skazhi.be' : true, credentials: true },
  });
  app.use(helmet());
  app.use(cookiesParser(process.env.COOKIE_SECRET));

  await app.listen(8041, '0.0.0.0');
}
bootstrap();

process.on('uncaughtException', error => {
  console.error('uncaughtException handled, restarting...');
  console.error(error);
  if (process.env.NODE_ENV === 'production') {
    process.exit(1);
  }
});

process.on('unhandledRejection', reason => {
  console.error('unhandledRejection handled, restarting...');
  reason && console.error(reason);
  if (process.env.NODE_ENV === 'production') {
    process.exit(1);
  }
});

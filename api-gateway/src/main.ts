import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PinoLoggerService } from '@common/logger/adapters/real/pinoLogger.service';
import { middleware as expressCtx } from 'express-ctx';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = app.get(PinoLoggerService);
  logger.setContext('main');
  app.useLogger(logger);

  app.use(expressCtx);

  if (process.env.NODE_ENV !== 'test') {
    app.enableShutdownHooks();
  }

  await app.listen(3000);
  logger.log('API-Gateway is listening on port 3000');
}

bootstrap();

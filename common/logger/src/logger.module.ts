import { Global, Module } from '@nestjs/common';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import * as uuid from 'uuid';
import { stdTimeFunctions } from 'pino';

import { PinoLoggerService } from './adapters/real/pinoLogger.service';
import { FakeLoggerService } from './adapters/fake/faleLogger.service';

declare module 'http' {
  interface IncomingMessage {
    requestId: string;
  }
}

@Global()
@Module({
  imports: [
    PinoLoggerModule.forRoot({
      pinoHttp: {
        name: 'clean-architecture-fp-demo',
        level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
        genReqId: (req) => req.requestId || uuid.v4(),
        formatters: { bindings: () => ({}) },
        // redact
        timestamp: stdTimeFunctions.unixTime,
      },
    }),
  ],
  providers: [FakeLoggerService, PinoLoggerService],
  exports: [FakeLoggerService, PinoLoggerService],
})
export class LoggerModule {}

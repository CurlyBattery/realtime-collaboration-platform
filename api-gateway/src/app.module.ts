import {
  DynamicModule,
  ForwardReference,
  Module,
  OnModuleInit,
  Type,
} from '@nestjs/common';

import { PinoLoggerService } from '@common/logger/adapters/real/pinoLogger.service';
import { LoggerModule } from '@common/logger/logger.module';
import { NotificationsModule } from '@notifications/notifications.module';
import { IdentityAndAccessModule } from '@identity-and-access/identityAndAccess.module';

type NestModuleImport =
  | Type<any>
  | DynamicModule
  | Promise<DynamicModule>
  | ForwardReference<any>;

const appModules: NestModuleImport[] = [
  LoggerModule,
  NotificationsModule,
  IdentityAndAccessModule,
];

@Module({
  imports: [...appModules],
  controllers: [],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly logger: PinoLoggerService) {}

  onModuleInit(): void {
    this.logger.setContext('AppModule');
  }
}

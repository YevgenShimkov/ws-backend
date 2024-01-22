import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionConfigService } from '@src/custom-config/database/connection-config.service';
import { UserModule } from './user/user.module';
import { CustomConfigModule } from '@src/custom-config/custom-config.module';
import { EventModule } from './event/event.module';
import { LogModule } from './log/log.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [CustomConfigModule],
      inject: [ConnectionConfigService],
      useFactory: (configService: ConnectionConfigService) =>
        configService.getDbConnectionOptions(),
    }),
    UserModule,
    EventModule,
    LogModule,
    ProfileModule,
  ],
})
export class AppModule {}

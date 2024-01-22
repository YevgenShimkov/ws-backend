import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CustomConfigService } from '@src/custom-config/custom-config.service';
import { ConnectionConfigService } from '@src/custom-config/database/connection-config.service';
import { getEvnPath } from '@src/custom-config/utils/get-env-path.util';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: getEvnPath(),
    }),
  ],
  providers: [
    CustomConfigService,
    ConnectionConfigService,
    // AwsCognitoConfigService,
  ],
  exports: [
    CustomConfigService,
    ConnectionConfigService,
    // AwsCognitoConfigService,
  ],
})
export class CustomConfigModule {}

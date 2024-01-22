import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import * as dbMigrations from '@src/custom-config/database/migrations';
import { User } from '@src/user/entities/user.entity';
import { CustomConfigService } from '@src/custom-config/custom-config.service';
import { Log } from '@src/log/entities/log.entity';
import { Profile } from '@src/profile/entities/profile.entity';
import { Event } from '@src/event/entities/event.entity';

@Injectable()
export class ConnectionConfigService {
  private readonly dbConnectionOptions: TypeOrmModuleOptions;

  constructor(private readonly configService: CustomConfigService) {
    this.dbConnectionOptions = {
      type: 'postgres',
      url: configService.get<string>('POSTGRES_URL'),
      // autoLoadEntities: true,
      entities: [User, Log, Event, Profile],
      // entities: [__dirname + '/src/**/entities/*.entity{.js, .ts}'],
      migrations: Object.values(dbMigrations),
      migrationsRun: true,
      migrationsTableName: 'ws_migrations',
      synchronize: false,
      logging: true,
    };
  }

  public getDbConnectionOptions() {
    return this.dbConnectionOptions;
  }
}

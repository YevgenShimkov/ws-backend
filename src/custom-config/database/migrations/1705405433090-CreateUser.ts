import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumnOptions,
} from 'typeorm';
import { UserStatus } from '@src/common/enums/user-status.enums';

export class CreateUser1705405433090 implements MigrationInterface {
  private tableName = 'ws_user';

  private columns: TableColumnOptions[] = [
    {
      name: 'id',
      type: 'int4',
      isPrimary: true,
      isGenerated: true,
    },
    {
      name: 'email',
      type: 'varchar',
      length: '255',
      isUnique: true,
    },
    {
      name: 'cognito_id',
      type: 'uuid',
      isUnique: true,
    },
    {
      name: 'status',
      type: 'enum',
      enum: [UserStatus.ACTIVE, UserStatus.PENDING],
    },
    {
      name: 'created_at',
      type: 'timestamp',
      default: 'NOW()',
    },
    {
      name: 'updated_at',
      type: 'timestamp',
      default: 'NOW()',
    },
  ];

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: this.columns,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}

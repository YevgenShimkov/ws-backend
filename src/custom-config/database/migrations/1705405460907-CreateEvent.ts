import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumnOptions,
  TableForeignKeyOptions,
} from 'typeorm';
import {
  SenderProviderEventEnum,
  StatusEnum,
  StatusEventEnum,
} from '@src/event/enums/event.unums';

export class CreateEvent1705405460907 implements MigrationInterface {
  private readonly tableName = 'ws_event';

  private readonly columns: TableColumnOptions[] = [
    {
      name: 'id',
      type: 'int4',
      isPrimary: true,
      isGenerated: true,
    },
    {
      name: 'user_id',
      type: 'int4',
      isNullable: false,
      isUnique: false,
    },
    {
      name: 'title',
      type: 'varchar',
      length: '100',
    },
    {
      name: 'description',
      type: 'varchar',
    },
    {
      name: 'event_status',
      type: 'enum',
      enum: [
        StatusEventEnum.CREATED,
        StatusEventEnum.DELETED,
        StatusEventEnum.UPDATED,
      ],
    },
    {
      name: 'deadline',
      type: 'timestamp',
    },
    {
      name: 'status',
      type: 'enum',
      enum: [StatusEnum.SUCCESS, StatusEnum.ERROR],
    },
    {
      name: 'sender_provider',
      type: 'enum',
      enum: [SenderProviderEventEnum.CLICK_UP, SenderProviderEventEnum.OUTLOOK],
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

  private readonly foreignKeys: TableForeignKeyOptions[] = [
    {
      name: 'ws_event_ws_user_fk',
      columnNames: ['user_id'],
      referencedTableName: 'ws_user',
      referencedColumnNames: ['id'],
    },
  ];
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: this.columns,
        foreignKeys: this.foreignKeys,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}

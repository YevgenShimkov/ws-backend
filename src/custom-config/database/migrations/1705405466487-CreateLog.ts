import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumnOptions,
  TableForeignKeyOptions,
} from 'typeorm';

export class CreateLog1705405466487 implements MigrationInterface {
  private readonly tableName = 'ws_log';

  private readonly columns: TableColumnOptions[] = [
    {
      name: 'id',
      type: 'int4',
      isPrimary: true,
      isGenerated: true,
    },
    {
      name: 'message',
      type: 'varchar',
    },
    {
      name: 'event_id',
      type: 'int4',
      isNullable: false,
      isUnique: false,
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
      name: 'ws_log_ws_event_fk',
      columnNames: ['event_id'],
      referencedTableName: 'ws_event',
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
